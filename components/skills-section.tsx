"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { motion } from "framer-motion"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { useEffect, useState } from "react"
import { getAllSkills } from "@/services/skills"
import { ISkill } from "@/types";

export function SkillsSection() {
  const [skill, setSkills] = useState<ISkill[]>([])

  useEffect(() => {
    const skillss = async () => {
      const data = await getAllSkills()
      setSkills(data)
    }

    skillss()
  }, [])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto p-[2rem] relative z-10">
        <ScrollAnimation>
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              My Skills
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Expertise</h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              A comprehensive overview of my technical skills and competencies.
            </p>
          </div>
        </ScrollAnimation>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skill.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <motion.div
                    className="mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                      {/* {typeof category.icon === "string" && Object.hasOwn(icons, category.icon) && ( */}
                        <DynamicIcon name={category.icon as IconName} />
                    </motion.div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.3 },
                          },
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="secondary">{skill}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
        ))}
      </div>
    </section>
  )
}

