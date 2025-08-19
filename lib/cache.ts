import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getPendingConfigCache = unstable_cache(
    async () => {
          const config = await prisma.config.findFirst({
                    where: { code: 100 },
                });
        
                if (!config)  return null;

                const parsedConfig = {
                    ...config,
                    socialMedia: config.socialMedia ? JSON.parse(config.socialMedia as string) : [],
                    contactInfo: config.contactInfo ? JSON.parse(config.contactInfo as string) : [],
                };

        return parsedConfig;
    },
    ["config"],
    {
        tags: ["config"],
        revalidate: 86400,
    }
)

export const getSkillCache = unstable_cache(
    async () => {
               const allSkill = await prisma.skill.findMany()
               return allSkill
    },
    ["skills"],
    {
        tags: ["skills"],
        revalidate: 86400,
    }
)

export const getProjectCache = unstable_cache(
    async (page: number, limitParam: number ) => {

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
    },
    ["projects", "page", "limit"],
    {
        tags: ["projects"],
        revalidate: 3600,
    }
)

export const getWorkCache = unstable_cache(
    async () => {
         const allWork = await prisma.work.findMany({
                    orderBy: {
                        pos: "desc"
                    }
                })
                return allWork
    },
    ["work"],
    {
        tags: ["work"],
        revalidate: 86400,
    }
)