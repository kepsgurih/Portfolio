import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from "bcryptjs";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = userSchema.parse(body);

        const config = await prisma.config.findFirst();

        if (config?.allowRegister === false) {
            return NextResponse.json(
                { error: "Registrasi ditutup oleh administrator" },
                { status: 403 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email sudah digunakan" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.json({ message: "Registrasi berhasil", user }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        } else if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
        }
    }
}
