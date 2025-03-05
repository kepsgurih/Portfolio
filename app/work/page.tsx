"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Navbar } from "@/components/navbar"
import { useEffect, useState } from "react"
import { getAllWork } from "@/services/work"
import { IWork } from "@/types"



export default function WorkPage() {
  const [workExperience, setWorkExperience] = useState<IWork[]>([])

  useEffect(() => {
    const workExp = async () => {
      const data: IWork[] | [] = await getAllWork()
      setWorkExperience(data)
    }

    workExp()
  }, [])

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <main className="container mx-auto py-12 md:py-20">
        <ScrollAnimation>
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              My Experience
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work History</h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              A detailed overview of my professional journey and accomplishments.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-400 before:to-transparent">
          {workExperience.map((job, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <div className="relative flex items-start">
                <div className="absolute left-0 mt-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-primary bg-background"></div>
                <motion.div
                  className="ml-10 w-full max-w-3xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="w-full hover:shadow-lg transition-shadow duration-300 bg-white border-purple-200">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground mt-1">
                            <span className="font-medium">{job.company}</span>
                          </div>
                        </div>
                        <Badge className="w-fit flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {job.period}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Achievements:</h4>
                        <ul className="space-y-1 list-disc pl-5">
                          {job.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="text-muted-foreground text-sm">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </main>
    </div>
  )
}

