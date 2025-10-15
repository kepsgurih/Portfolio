import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"
import Providers from "./provider"
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
          <Toaster />
          <Providers>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Providers>
        </div>
      </body>
    </html>
  )
}