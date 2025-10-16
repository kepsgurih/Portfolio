"use server"

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache"

export const getConfig = async () => {
    "use cache"
    cacheTag("config")
    const config = await prisma.config.findFirst({
        where: { code: 100 },
    });

    if (!config) {
        return {
            error: true,
            message: "Config not found",
        }
    }

    return {
        error: false,
        config,
    }
}

export const updateConfig = async (formData: FormData) => {
    const socialMedia = formData.get("socialMedia") as string
    const contactInfo = formData.get("contactInfo") as string
    const description = formData.get("description") as string
    const whoami = formData.get("whoami") as string
    const journey = formData.get("journey") as string
    const yearsExperience = formData.get("yearsExperience") as string
    const projectCompleted = formData.get("projectCompleted") as string
    const happyClient = formData.get("happyClient") as string
    const technologies = formData.get("technologies") as string
    const image = formData.get("image") as File
    const banner = formData.get("banner") as File
    const allowRegister = formData.get("allowRegister") === "true" ? true : false

    const existingConfig = await prisma.config.findFirst({
        where: { code: 100 },
    });

    if (!socialMedia || !contactInfo) {
        return {
            error: true,
            message: "All fields are required"
        }
    }

    if (!image || !banner) {
        await prisma.config.update({
            where: {
                id: existingConfig?.id
            },
            data: {
                description,
                whoami,
                journey,
                yearsExperience: parseInt(yearsExperience),
                projectCompleted: parseInt(projectCompleted),
                happyClient: parseInt(happyClient),
                technologies: parseInt(technologies),
                socialMedia: JSON.parse(socialMedia),
                contactInfo: JSON.parse(contactInfo),
                allowRegister
            }
        })
    } else {
        // Upload banner (jika ada)
        let bannerUrl = existingConfig?.banner
        if (banner && banner.size > 0) {
            const blob = await put(randomUUID(), banner, { access: 'public' })
            bannerUrl = blob.url
        }

        // Upload image (jika ada)
        let imageUrl = existingConfig?.image
        if (image && image.size > 0) {
            const blob2 = await put(randomUUID(), image, { access: 'public' })
            imageUrl = blob2.url
        }

        await prisma.config.update({
            where: {
                id: existingConfig?.id
            },
            data: {
                description,
                whoami,
                journey,
                yearsExperience: parseInt(yearsExperience),
                projectCompleted: parseInt(projectCompleted),
                happyClient: parseInt(happyClient),
                technologies: parseInt(technologies),
                socialMedia: JSON.parse(socialMedia),
                contactInfo: JSON.parse(contactInfo),
                allowRegister,
                banner: bannerUrl,
                image: imageUrl
            }
        })
    }
    revalidateTag("config")
    return {
        error: false,
        message: "Success"
    }
}

