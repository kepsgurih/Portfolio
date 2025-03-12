import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limitParam = searchParams.get("limit");

        const isUnlimited = !limitParam || limitParam.toLowerCase() === "unlimited";
        const limit = isUnlimited ? undefined : parseInt(limitParam, 10);
        const skip = limit ? (page - 1) * limit : undefined;

        const totalProjects = await prisma.project.count();
        const totalPage = limit ? Math.ceil(totalProjects / limit) : 1;

        const allProjects = await prisma.project.findMany({
            skip,
            take: limit,
        });

        return NextResponse.json({ allProjects, totalProjects, totalPage }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const postNewProject = await prisma.project.create({
            data: {
                title: body.title,
                description: body.description,
                tags: body.tags,
                image: body.image, // URL dari Netlify Blob
                githubLink: body.githubLink,
                demoLink: body.demoLink,
            },
        });
        return NextResponse.json({ message: "Project added", postNewProject }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
        }
    }
}
