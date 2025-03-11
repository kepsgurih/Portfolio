"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookiesCreate } from "@/lib/cookies";


interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    error?: string;
}

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(1),
});


export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData): Promise<void> => {
        setLoading(true);
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            const responseData: LoginResponse = await res.json();
            console.log("API Response:", responseData);

            if (!responseData.token) {
                alert("Login gagal, token tidak ditemukan!");
                setLoading(false);
                return;
            }

            await cookiesCreate("token", responseData.token);
            router.replace("/dashboard");
        } else {
            const { error }: LoginResponse = await res.json();
            setError(error || "Terjadi kesalahan saat login.");
            setLoading(false);
        }

    };


    return (
        <div className="flex min-h-screen items-center justify-center ">
            <Card className="w-[400px] ">
                <CardHeader>
                    <CardTitle className="">Login</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
                        <Input type="email" required className="" placeholder="Email" {...register("email")} />
                        <Input className="" placeholder="Password" type="password" {...register("password")} />
                        <Button disabled={loading} type="submit" className="w-full">{loading ? "Loading..." : "Login"}</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
