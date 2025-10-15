"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { IProject } from "@/types"
import HeaderDiv from "./header-div"
import './card-style.css'
import { CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"


export function ProjectsSection({
  project,
}: {
  project: IProject[]
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
          {project && project.map((project, index) => (
            <motion.div
              key={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <div className="overcard flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div>{project.title}</div>
                <div className="font-description">
                  {project.description}
                </div>
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
                <CardFooter className="flex justify-betwee gap-4 my-10">
                  {project.githubLink && project.githubLink !== '#secret' && (<Button variant="outline" size="sm" asChild className="group">
                    <Link href={project.githubLink} target="_blank">
                      <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Code
                    </Link>
                  </Button>)}
                  <Button size="sm" asChild className="group">
                    <Link href={project.demoLink} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </div>
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

