"use client"

import { HeroSection } from "@/components/block/hero-section"
import { AboutSection } from "@/components/block/about-section"
import { ProjectsSection } from "@/components/block/projects-section"
import { SkillsSection } from "@/components/block/skills-section"
import { ContactSection } from "@/components/block/contact-section"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const { data: skill, isPending: pendingSkill } = useQuery({
    queryKey: ['skills'],
    queryFn: () => fetch('/api/skill').then(res => res.json()).then(data => data.allSkill)
  })

  const { data: config, isPending: pendingConfig } = useQuery({
    queryKey: ['config'],
    queryFn: () => fetch('/api/config').then(res => res.json()).then(data => data)
  })

  const { data: project, isPending: pendingProject } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/project?page=1&limit=3').then(res => res.json()).then(data => data.allProjects)
  })

  return (
    <>
      <HeroSection config={config} isPending={pendingConfig} />
      <AboutSection config={config} isPending={pendingConfig} />
      <ProjectsSection project={project} isPending={pendingProject || pendingConfig} />
      <SkillsSection skill={skill} isPending={pendingSkill || pendingConfig} />
      <ContactSection config={config} />
    </>
  )
}

