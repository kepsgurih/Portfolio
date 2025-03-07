import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = userSchema.parse(body);

        // Cek user di database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 404 });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json({ error: "Password salah" }, { status: 401 });

        // Buat token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        return NextResponse.json({ message: "Login berhasil", token }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        else if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
        }
    }
}