import profile from '../data/profile.json'
import { SectionHeading } from '../components/SectionHeading.jsx'

export function AboutSection() {
  return (
    <section id="about" className="border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Building scalable solutions with clean and efficient code."
          description={profile.summary}
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              What I care about
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-primary)]">
              {profile['care-about']}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-8">
              <p className="text-sm text-[var(--text-secondary)]">Experience</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                3+ years
              </p>
            </div>
            <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--brand-soft)] p-8">
              <p className="text-sm text-[var(--text-secondary)]">Focus</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Backend System, Web, Mobile Application
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
