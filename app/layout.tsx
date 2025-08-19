import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kevin Adhi Krisma",
  description: "Full-stack developer specializing in modern web applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen w-screen justify-center align-center">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster />
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}