import { unstable_cache, unstable_cacheTag as cacheTag } from "next/cache";
import { prisma } from "./prisma";

export const getPendingConfigCache = async () => {
    "use cache"
    cacheTag("config")
    const config = await prisma.config.findFirst({
        where: { code: 100 },
    });

    if (!config) return null;

    const parsedConfig = {
        ...config,
        socialMedia: config.socialMedia ? JSON.parse(config.socialMedia as string) : [],
        contactInfo: config.contactInfo ? JSON.parse(config.contactInfo as string) : [],
    };

    return parsedConfig;
}

export const getSkillCache = async () => {
    "use cache"
    cacheTag("skill")
    const allSkill = await prisma.skill.findMany()
    return allSkill
}

export const getProjectCache = async (page: number, limitParam: number) => {
    "use cache"
    cacheTag("projects")
    const isUnlimited = !limitParam || limitParam === 0
    const limit = isUnlimited ? undefined : limitParam;
    const skip = limit ? (page - 1) * limit : undefined;

    const totalProjects = await prisma.project.count();
    const totalPage = limit ? Math.ceil(totalProjects / limit) : 1;

    const allProjects = await prisma.project.findMany({
        skip,
        take: limit,
    });
    return { allProjects, totalProjects, totalPage };
}

export const getWorkCache = async () => {
    "use cache"
    cacheTag("work")
    const allWork = await prisma.work.findMany({
        orderBy: {
            pos: "desc"
        }
    })
    return allWork
}