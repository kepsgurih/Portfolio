import { HeroSection } from "@/components/block/hero-section"
import { AboutSection } from "@/components/block/about-section"
import { ProjectsSection } from "@/components/block/projects-section"
import { SkillsSection } from "@/components/block/skills-section"
import { ContactSection } from "@/components/block/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  )
}

