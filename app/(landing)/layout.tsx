'use client'

import type React from "react"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen w-screen bg-slate-900 justify-center align-center">
      <div className="relative justify-center align-center items-center relative min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="z-10 relative">
          {children}
        </div>
        <ParticlesBackground className="absolute inset-0 pointer-events-none z-0" />
        <div className={"absolute inset-0 pointer-events-none z-0 "}>
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 150 + 100;
            const colors = ['bg-red-500/50', 'bg-blue-500/20', 'bg-green-500/10', 'bg-yellow-500/10', 'bg-purple-500/10'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${randomColor}`}
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'blur(20px)',
                }}
                animate={{
                  y: [Math.random() * 100, Math.random() * -100],
                  x: [Math.random() * 100, Math.random() * -100],
                  scale: [1, Math.random() + 0.5, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )
          })}

        </div>

      </div>
      <Footer />
    </div>
  )
}