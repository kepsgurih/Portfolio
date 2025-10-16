"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ContainerCard from "../container"
import HeaderDiv from "./header-div"
import { Config } from "@prisma/client"

export function AboutSection({
  config,
}: {
  config: Config
}) {
  return (
    <ContainerCard>
      <div className="container mx-auto p-[2rem]">
        <HeaderDiv tag="About Me" title="Who I Am" description="Learn more about my journey, experience, and what drives me as a developer." />

        <div className="grid gap-8 md:grid-cols-2">
          <ScrollAnimation
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                {
                  config?.banner && (
                    <Image
                      alt="Profile"
                      className="aspect-square h-full w-full object-cover"
                      width={400}
                      height={400}
                      src={config?.banner}
                    />
                  )
                }
              </motion.div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="flex flex-col justify-center gap-4">
              <h3 className="text-2xl font-bold">My Journey</h3>
              <p className="text-gray-400">
                {config.journey}
              </p>
              <motion.div
                className="grid grid-cols-2 gap-4 mt-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { value: config.yearsExperience, label: "Years Experience" },
                  { value: config.projectCompleted, label: "Projects Completed" },
                  { value: config.happyClient, label: "Happy Clients" },
                  { value: config.technologies, label: "Technologies" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 ">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <motion.div
                          className="text-4xl font-bold "
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.1 * index,
                            duration: 0.5,
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 2,
                              delay: 0.5 + 0.1 * index,
                            }}
                          >
                            {item.value}
                          </motion.span>
                        </motion.div>
                        <p className="text-sm text-muted-foreground group-hover: transition-colors duration-300">
                          {item.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="mt-6 flex justify-center md:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Button variant="outline" className="group" asChild>
                  <Link href="/work" className="flex items-center gap-2">
                    View Work History
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </ContainerCard>
  )
}