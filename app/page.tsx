import { Cursor } from "@/components/cursor"
import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/sections/about-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ResumeSection } from "@/components/sections/resume-section"
import { SkillsSection } from "@/components/sections/skills-section"

export default function Home() {
  return (
    <main className="relative bg-black text-white min-h-screen">
      <Cursor />
      <Navigation />
      <div className="container mx-auto">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </main>
  )
}
