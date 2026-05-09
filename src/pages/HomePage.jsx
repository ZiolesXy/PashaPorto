import { Navbar } from '../components/Navbar.jsx'
import { StarBackground } from '../components/StarBackground.jsx'
import { AboutSection } from '../sections/AboutSection.jsx'
import { ContactSection } from '../sections/ContactSection.jsx'
import { FooterSection } from '../sections/FooterSection.jsx'
import { HeroSection } from '../sections/HeroSection.jsx'
import { ProjectsSection } from '../sections/ProjectsSection.jsx'
import { SkillsSection } from '../sections/SkillsSection.jsx'

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-16 text-[var(--text-primary)] transition-colors duration-500 sm:pb-20 lg:pb-24">
      <StarBackground />
      <Navbar />
      <main className="overflow-hidden pb-6 sm:pb-10 lg:pb-0">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  )
}
