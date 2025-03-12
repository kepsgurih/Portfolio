"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicIcon, IconName } from "lucide-react/dynamic";
// import { motion } from "framer-motion"
import { ISkill } from "@/types";
import ContainerCard from "../container";
import HeaderDiv from "./header-div";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false });

interface IPage {
  skill: ISkill[],
  isPending?: boolean
}

export function SkillsSection({ skill, isPending }: IPage) {

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

        <MotionDiv
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {
            isPending && (
              <div>
                <Loader2 className="animate-spin" />
              </div>
            )
          }

          {skill && skill.map((category, index) => (
            <MotionDiv key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 ">
                <CardContent className="p-6">
                  <MotionDiv
                    className="mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <MotionDiv whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                      <DynamicIcon name={category.icon as IconName} className="" />
                    </MotionDiv>
                    <h3 className="text-xl font-bold ">{category.title}</h3>
                  </MotionDiv>
                  <MotionDiv
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
                    {category.tags.map((skill, skillIndex) => (
                      <MotionDiv
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
                        <Badge variant="secondary" className=" ">{skill}</Badge>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </ContainerCard>
  )
}