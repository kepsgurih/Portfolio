"use server"

import { prisma } from "@/lib/prisma";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { put } from '@vercel/blob';
import { randomUUID } from "crypto";

export const getAllProject = async () => {
    "use cache"
    cacheTag('projects')
    const project = await prisma.project.findMany();

    return project
}

export const getAllProjectLimit3 = async ({ page = 10, limit }: { page: number, limit?: number | string }) => {
    "use cache"
    cacheTag('projects-with-limit')
    const isUnlimited = !limit || limit === "unlimited";
    const limits = isUnlimited ? undefined : 10;
    const skip = limits ? (page - 1) * limits : undefined;

    const totalProjects = await prisma.project.count();
    const totalPage = limits ? Math.ceil(totalProjects / limits) : 1;

    const allProjects = await prisma.project.findMany({
        skip,
        take: limits,
    });

    return { allProjects, totalProjects, totalPage }
}

export const createNewProject = async (formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const tags = formData.get('tags') as string
    const demoLink = formData.get('demoLink') as string
    const githubLink = formData.get('githubLink') as string
    const files = formData.get('image') as File

    if (!title || !description || !tags) {
        return {
            error: true,
            message: 'Please fill input form!'
        }
    }
    if (files.size === 0) {
        return {
            error: true,
            message: "Please insert image here!"
        }
    }

    const blob = await put(randomUUID(), files, {
        access: 'public'
    })

    await prisma.project.create({
        data: {
            title,
            description,
            tags: tags.split(",").map(tag => tag.trim()),
            demoLink,
            githubLink,
            image: blob.url
        }
    })

    revalidateTag('projects')
    revalidateTag('projects-with-limit')

    return {
        error: false,
        message: 'Success'
    }
}

export const updateProject = async (id: string, formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const tags = formData.get('tags') as string
    const demoLink = formData.get('demoLink') as string
    const githubLink = formData.get('githubLink') as string
    const files = formData.get('image') as File

    if (!title || !description || !tags) {
        return {
            error: true,
            message: 'Please fill input form!'
        }
    }

    if (files) {
        if (files.size === 0) {
            return {
                error: true,
                message: "Please insert image here!"
            }
        }
        const blob = await put(randomUUID(), files, {
            access: 'public'
        })
        await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                tags: tags.split(",").map(tag => tag.trim()),
                demoLink,
                githubLink,
                image: blob.url
            }

        });
    } else {
        await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                tags: tags.split(",").map(tag => tag.trim()),
                demoLink,
                githubLink
            }
        });
    }

    revalidateTag('projects')
    revalidateTag('projects-with-limit')

    return {
        error: false,
        message: 'Success'
    }
}

export const deleteProject = async (id: string) => {
    const deletes = await prisma.project.delete({
        where: { id }
    })

    if (!deletes) {
        return {
            error: true,
            message: 'Failed'
        }
    }
    revalidateTag('projects')
    revalidateTag('projects-with-limit')

    return {
        error: false,
        message: 'Success'
    }
}