import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { id, newPos } = await request.json()

        const work1 = await prisma.work.findUnique({ where: { id } })
        const work2 = await prisma.work.findUnique({ where: { pos: newPos } })

        if (!work1 || !work2) {
            return NextResponse.json({ error: "Work not found" }, { status: 404 })
        }

        await prisma.$transaction([
            prisma.work.update({ where: { id: work1.id }, data: { pos: -1 } }),
            prisma.work.update({ where: { id: work2.id }, data: { pos: work1.pos } }),
            prisma.work.update({ where: { id: work1.id }, data: { pos: work2.pos } }),
        ])

        return NextResponse.json({ message: "Work position swapped successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
            { status: 500 }
        )
    }
}
