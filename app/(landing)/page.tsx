"use client"

import { HeroSection } from "@/components/block/hero-section"
import { AboutSection } from "@/components/block/about-section"
import { ProjectsSection } from "@/components/block/projects-section"
import { SkillsSection } from "@/components/block/skills-section"
import { ContactSection } from "@/components/block/contact-section"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const {data:skill, isPending:pendingSkill} = useQuery({
    queryKey: ['skills'],
    queryFn: () => fetch('/api/skill').then(res => res.json()).then(data => data.allSkill)
  })

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection skill={skill} isPending={pendingSkill} />
      <ContactSection />
    </>
  )
}

