import { HeroSection } from "@/components/block/hero-section"
import { AboutSection } from "@/components/block/about-section"
import { ProjectsSection } from "@/components/block/projects-section"
import { SkillsSection } from "@/components/block/skills-section"
import { ContactSection } from "@/components/block/contact-section"
import { getPendingConfigCache, getProjectCache, getSkillCache } from "@/lib/cache"
import { notFound } from "next/navigation"

export default async function Home() {
  const config = await getPendingConfigCache()
  const skill = await getSkillCache()
  const project = await getProjectCache(1, 3)
  if(!config || !skill || !project) {
    return notFound()
  }

  return (
    <>
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ProjectsSection project={project.allProjects}  />
      <SkillsSection skill={skill} />
      <ContactSection config={config} /> 
    </>
  )
}

