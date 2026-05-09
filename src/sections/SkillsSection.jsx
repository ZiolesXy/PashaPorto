import skills from '../data/skills.json'
import { SkillCard } from '../components/SkillCard.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { RevealSection } from '../components/RevealSection.jsx'
import { navigateTo } from '../utils/navigate.js'

export function SkillsSection() {
  const visibleSkills = skills.slice(0, 3)
  const hasMoreThanRange = skills.length > 1

  return (
    <section id="skills" className="border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Capabilities"
            title="A compact stack tuned for shipping polished interfaces."
            description="Reusable UI, theme-aware styling, and component boundaries that stay sane as the app expands."
          />
          {hasMoreThanRange ? (
            <a
              href="/skills"
              onClick={(event) => {
                event.preventDefault()
                navigateTo('/skills')
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
            >
              See more
            </a>
          ) : null}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleSkills.map((skill) => (
            <RevealSection key={skill.category}>
              <SkillCard skill={skill} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
