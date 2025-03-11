import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = (await params).id
    try {
        const body = await request.json()
        const postNewSkill = await prisma.work.update({
            where: {
                id
            },
            data: {
                company: body.company,
                location: body.location,
                description: body.description,
                tags: body.tags,
                achievement: body.achievement,
                pos: body.pos
            }
        })
        return NextResponse.json({ message: "Work Updated", postNewSkill }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = (await params).id
    try {
        const postNewSkill = await prisma.work.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Work Deleted", postNewSkill }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}