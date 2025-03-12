import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ slug: string, id: string }>

export async function PUT(request: NextRequest, segment: { params: Params }) {
    const params = await segment.params
    const { id } = params
    try {
        const body = await request.json()
        const postNewproject = await prisma.project.update({
            where: {
                id
            },
            data: {
                title: body.title,
                description: body.description,
                tags: body.tags,
                image: body.image,
                githubLink: body.githubLink,
                demoLink: body.demoLink,
            }
        })
        return NextResponse.json({ message: "project Updated", postNewproject }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}

export async function DELETE(request: NextRequest, segment: { params: Params }) {
    const params = await segment.params
    const { id } = params
    try {
        const postNewproject = await prisma.project.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "project Deleted", postNewproject }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}