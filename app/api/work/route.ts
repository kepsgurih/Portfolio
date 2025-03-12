import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const allWork = await prisma.work.findMany({
            orderBy: {
                pos: "desc"
            }
        })
        return NextResponse.json({ allWork }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.title || !body.period || !body.company || !body.location || !body.description) {
            return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
        }

        const totalWork = await prisma.work.count()
        const pos = totalWork + 1

        const postNew = await prisma.work.create({
            data: {
                ...body,
                pos
            }
        })

        return NextResponse.json({ message: "Work added", postNew }, { status: 201 })
    } catch (error) {
        console.error("POST /api/work error:", error)

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
            { status: 500 }
        )
    }
}
