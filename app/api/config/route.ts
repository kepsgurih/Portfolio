import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CONFIG_CODE = 100;

export async function GET() {
    try {
        const config = await prisma.config.findFirst({
            where: { code: CONFIG_CODE },
        });

        if (!config) {
            return NextResponse.json({ message: "Config not found" }, { status: 404 });
        }
        const parsedConfig = {
            ...config,
            socialMedia: config.socialMedia ? JSON.parse(config.socialMedia as string) : [],
            contactInfo: config.contactInfo ? JSON.parse(config.contactInfo as string) : [],
        };

        return NextResponse.json(parsedConfig);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching config", error }, { status: 500 });
    }
}

// POST: Buat atau update konfigurasi
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const existingConfig = await prisma.config.findFirst({
            where: { code: CONFIG_CODE },
        });

        if (existingConfig) {
            const updatedConfig = await prisma.config.update({
                where: { id: existingConfig.id },
                data: {
                    description: body.description,
                    whoami: body.whoami,
                    journey: body.journey,
                    yearsExperience: body.yearsExperience,
                    projectCompleted: body.projectCompleted,
                    happyClient: body.happyClient,
                    technologies: body.technologies,
                    socialMedia: body.socialMedia ? JSON.stringify(body.socialMedia) : undefined,
                    contactInfo: body.contactInfo ? JSON.stringify(body.contactInfo) : undefined,
                    image: body.image || "",
                    banner: body.banner || "",
                    allowRegister: body.allowRegister,
                    code: body.code,
                },
            });

            return NextResponse.json(updatedConfig, { status: 200 });
        } else {
            const newConfig = await prisma.config.create({
                data: {
                    description: body.description,
                    whoami: body.whoami,
                    journey: body.journey,
                    yearsExperience: body.yearsExperience,
                    projectCompleted: body.projectCompleted,
                    happyClient: body.happyClient,
                    technologies: body.technologies,
                    socialMedia: body.socialMedia ? JSON.stringify(body.socialMedia) : undefined,
                    contactInfo: body.contactInfo ? JSON.stringify(body.contactInfo) : undefined,
                    image: body.image || null,
                    banner: body.banner || null,
                    allowRegister: body.allowRegister,
                    code: body.code,
                },
            });

            return NextResponse.json(newConfig, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error updating config", error }, { status: 500 });
    }
}
