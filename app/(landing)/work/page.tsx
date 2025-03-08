"use client"

import { Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { useEffect, useState } from "react"
import { getAllWork } from "@/services/work"
import { IWork } from "@/types"
import HeaderDiv from "@/components/block/header-div"



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
    <div className="min-h-screen">
      <HeaderDiv title="Work Experience" description="A selection of my recent work and personal projects." tag="My Work" />

      <div className="z-10 mt-12 flex flex-col gap-8">
        {workExperience.map((job, index) => (
          <ScrollAnimation key={index} delay={index * 0.1}>
            <div className="relative flex items-start">
              <div className="absolute left-0 mt-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-primary "></div>
              <motion.div
                className="ml-10 w-full max-w-3xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full hover:shadow-lg transition-shadow duration-300 border-purple-200">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="flex items-center gap-1 text-secondary mt-1">
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div>
                      <Badge className="w-fit flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {job.period}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-secondary text-sm mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary mb-4">{job.description}</p>
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
                          <li key={achievementIndex} className="text-secondary text-sm">
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

    </div>
  )
}

