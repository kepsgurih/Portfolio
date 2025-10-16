"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { easeOut, motion, useAnimation, type Variants } from "framer-motion"

interface ScrollAnimationProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function ScrollAnimation({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [, setIsInView] = useState(false)

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: easeOut,
      },
    },
  }

  useEffect(() => {
    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          controls.start("visible")
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsInView(false)
          controls.start("hidden")
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (element) observer.observe(element)
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [controls, once, threshold])


  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
