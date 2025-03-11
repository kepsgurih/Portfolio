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
    <div className="min-h-screen px-4 sm:px-6 md:px-8">
      <HeaderDiv title="Work Experience" description="A selection of my recent work and personal projects." tag="My Work" />

      <div className="relative z-10 mt-12 flex flex-col gap-8 mx-auto w-full max-w-3xl">
        {/* Garis vertikal timeline */}
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-1 bg-primary/50"></div>

        {workExperience.map((job, index) => (
          <ScrollAnimation key={index} delay={index * 0.1}>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
              {/* Bulatan */}
              <div className="absolute left-0 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 -translate-x-1/2 rounded-full border-4 border-primary bg-white"></div>

              <motion.div
                className="sm:ml-10 w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full hover:shadow-lg transition-shadow duration-300 border-purple-200">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold ">{job.title}</h3>
                        <div className="flex items-center gap-1  mt-1">
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div>
                      <Badge className="w-fit flex items-center gap-1 text-xs sm:text-sm">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        {job.period}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1  text-xs sm:text-sm mt-1">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{job.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className=" mb-4 text-sm sm:text-base">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs sm:text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm sm:text-base ">Key Achievements:</h4>
                      <ul className="space-y-1 list-disc pl-4 sm:pl-5 text-xs sm:text-sm">
                        {job.achievement.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="">
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
