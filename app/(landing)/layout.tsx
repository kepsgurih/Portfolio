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
    <div className="min-h-screen w-screen justify-center align-center">
      <div className="relative justify-center align-center items-center relative min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="z-10 relative">
          {children}
        </div>
        <ParticlesBackground className="absolute inset-0 pointer-events-none z-0" />
        <div className={"absolute inset-0 pointer-events-none z-0 "}>
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 150 + 100;
            const colors = ['bg-gradient-to-r from-rose-400/20 to-red-500/20', 'bg-gradient-to-r from-violet-200/20 to-pink-200/20', 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20', 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20', 'bg-gradient-to-r from-slate-500/20 to-slate-800/20'];
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
      <Footer />
      </div>
    </div>
  )
}