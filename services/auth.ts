"use server"
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";

export default async function loginFunction(formData: FormData) {
    try {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
    
            // Cek user di database
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return {success: false, error: "Email tidak ditemukan", token: null };
    
            // Cek password
            const isMatch = await compare(password, user.password);
            if (!isMatch) return {success: false, error: "Password salah", token: null };
    
            // Buat token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    
            return { success: true, error: null, token };
        } catch (error) {
            if (error instanceof z.ZodError) {
                return { success: false, error: error.errors.map(e => e.message).join(", "), token: null };
            }
            else if (error instanceof Error) {
                return { success: false, error: error.message, token: null };
            } else {
                return { success: false, error: "Terjadi kesalahan tak terduga", token: null };
            }
        }
}