"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { IProject } from "@/types"
import HeaderDiv from "@/components/block/header-div"
import { useQuery } from "@tanstack/react-query"

export default function ProjectsPage() {
    const { data: projectData, isPending: pendingProject } = useQuery({
        queryKey: ['projects'],
        queryFn: () => fetch('/api/project').then(res => res.json()).then(data => data.allProjects)
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-8">
            <HeaderDiv title="All Projects" description=" A comprehensive showcase of my work across various technologies and domains." tag="Projects" />
            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {
                    pendingProject && <h1>Loading...</h1>
                }
                {projectData && projectData.map((project: IProject, index: number) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5 },
                            },
                        }}
                    >
                        <Card className="mx-4 md:mx-0 overflow-hidden h-full group border-purple-200">
                            <div className="aspect-video overflow-hidden">
                                <motion.img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="h-full w-full object-cover "
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="">{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <motion.div
                                            key={tagIndex}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.05 * tagIndex }}
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
        </div>
    )
}

