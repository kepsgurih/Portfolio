"use client"

import Link from "next/link"
import { ExternalLink, Github, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { IProject } from "@/types"
import HeaderDiv from "./header-div"


export function ProjectsSection({
  project,
  isPending,
}: {
  project: IProject[]
  isPending: boolean
}) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto p-[2rem]">
        <HeaderDiv title="Featured Projects" description="A selection of my recent work and personal projects." tag="My Work" />

        <motion.div
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"

        >
          {
            isPending && (
              <div>
                <Loader2 className="animate-spin" />
              </div>
            )
          }
          {project && project.map((project, index) => (
            <motion.div
              key={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <Card className="overflow-hidden h-full group ">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="">{project.title}</CardTitle>
                  <CardDescription className="">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * tagIndex }}
                      >
                        <Badge variant="secondary">{tag}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild className="group">
                    <Link href={project.githubLink}>
                      <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="group">
                    <Link href={project.demoLink}>
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <ScrollAnimation delay={0.5}>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="group">
              <Link href="/project" className="flex items-center">
                View All Projects
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="inline-block">
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Link>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

