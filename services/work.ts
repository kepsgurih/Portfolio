"use server"

import { prisma } from "@/lib/prisma"
import { unstable_cacheTag as cacheTag, revalidatePath, revalidateTag } from "next/cache"

export const getAllWork = async () => {
    "use cache"
    cacheTag("work")

    const allWork = await prisma.work.findMany({
        orderBy: {
            pos: "desc"
        }
    })

    return allWork
}

export const addWork = async (formData: FormData) => {
    const title = formData.get("title") as string
    const period = formData.get("period") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    if (!title || !period || !company || !location || !description || !tags) {
        return { success: false, message: "All fields are required" }
    }

    const totalWork = await prisma.work.count()
    const pos = totalWork + 1

    await prisma.work.create({
        data: {
            title,
            period,
            company,
            location,
            description,
            tags: tags.split(",").map(tag => tag.trim()),
            pos
        }
    })
    revalidateTag("work")
    return { success: true, message: "Work experience added successfully" }
}

export const updateWork = async (id: string, formData: FormData) => {
    const title = formData.get("title") as string
    const period = formData.get("period") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    if (!title || !period || !company || !location || !description || !tags) {
        return { success: false, message: "All fields are required" }
    }
    console.log(id, title)
    const work = await prisma.work.update({
        where: { id },
        data: {
            title,
            period,
            company,
            location,
            description,
            tags: tags.split(",").map(tag => tag.trim())
        }
    })
    if (!work) {
        return { success: false, message: "Failed to update work experience" }
    }
    revalidateTag("work")
    return { success: true, message: "Work experience updated successfully" }
}

export const swapWorkPosition = async (id: string, newPos: number) => {
    const work1 = await prisma.work.findUnique({ where: { id } })
    const work2 = await prisma.work.findUnique({ where: { pos: newPos } })
    if (!work1 || !work2) {
        return { success: false, message: "Work experience not found" }
    }

    await prisma.$transaction([
        prisma.work.update({ where: { id: work1.id }, data: { pos: -1 } }),
        prisma.work.update({ where: { id: work2.id }, data: { pos: work1.pos } }),
        prisma.work.update({ where: { id: work1.id }, data: { pos: work2.pos } }),
    ])


    revalidateTag("work")
    return { success: true, message: "Work experience position swapped successfully" }
}

export const deleteWork = async (id: string) => {
    const deletes = await prisma.work.delete({
        where: { id }
    })
    if (!deletes) {
        return { success: false, message: "Failed to delete work experience" }
    }
    revalidateTag("work")
    return { success: true, message: "Work experience deleted successfully" }
}
