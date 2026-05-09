import projects from '../data/projects.json'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { RevealSection } from '../components/RevealSection.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { useMemo } from 'react'

export function ProjectsSection() {
  const visibleProjects = useMemo(() => projects.slice(0, 3), [])
  const hasMoreThanRange = projects.length > 1

  return (
    <section id="projects" className="border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Project cards with stronger hierarchy and hover depth."
            description="A cleaner gallery layout with dominant thumbnails, clearer actions, and a softer motion profile."
          />
          {hasMoreThanRange ? (
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
            >
              See more
            </a>
          ) : null}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <RevealSection key={project.id}>
              <ProjectCard project={project} index={index} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
