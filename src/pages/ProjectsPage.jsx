import projects from '../data/projects.json'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { RevealSection } from '../components/RevealSection.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { StarBackground } from '../components/StarBackground.jsx'
import { FooterSection } from '../sections/FooterSection.jsx'

export function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-16 text-[var(--text-primary)] transition-colors duration-500 sm:pb-20 lg:pb-24">
      <StarBackground />
      <main className="overflow-hidden pb-6 sm:pb-10 lg:pb-0">
        <section className="border-b border-[var(--border-color)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="All projects"
                title="Full project archive."
                description="Browse every project in one place."
              />
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
              >
                Back
              </a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <RevealSection key={project.id}>
                  <ProjectCard project={project} index={index} />
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
