import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ slug: string, id: string }>

export async function PUT(request: NextRequest, segment: { params: Params }) {
    const params = await segment.params
    const { id } = params
    try {
        const body = await request.json()
        const postNewSkill = await prisma.skill.update({
            where: {
                id
            },
            data: {
                title: body.title,
                icon: body.icon,
                tags: body.tags
            }
        })
        return NextResponse.json({ message: "Skill Updated", postNewSkill }, { status: 201 })
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
        const postNewSkill = await prisma.skill.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Skill Deleted", postNewSkill }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}