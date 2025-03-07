"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getAllSkills } from "@/services/skills"
import { ISkill } from "@/types";
import ContainerCard from "../container";
import HeaderDiv from "./header-div";

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
    <ContainerCard>
      <div className="container mx-auto p-[2rem] relative z-10">
        <HeaderDiv tag="My Skills" title="Technical Expertise" description={`A comprehensive overview of my technical skills and competencies.`} />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skill.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-slate-800">
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
                        <DynamicIcon name={category.icon as IconName} className="text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary">{category.title}</h3>
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
                        <Badge variant="secondary" className="bg-slate-900 text-slate-200">{skill}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ContainerCard>
  )
}

