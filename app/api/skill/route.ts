import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1", 10)
        const limitParam = searchParams.get("limit")

        const isUnlimited = !limitParam || limitParam.toLowerCase() === "unlimited"
        const limit = isUnlimited ? undefined : parseInt(limitParam, 10)
        const skip = limit ? (page - 1) * limit : undefined

        const totalSkill = await prisma.skill.count()

        const totalPage = limit ? Math.ceil(totalSkill / limit) : 1

        const allSkill = await prisma.skill.findMany({
            skip,
            take: limit,
        })

        return NextResponse.json({ allSkill, totalSkill, totalPage }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
            { status: 500 }
        )
    }
}



export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const postNewSkill = await prisma.skill.create({
            data: {
                title: body.title,
                icon: body.icon,
                tags: body.tags
            }
        })
        return NextResponse.json({ message: "Skill added", postNewSkill }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}
