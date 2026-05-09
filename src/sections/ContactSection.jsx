import profile from '../data/profile.js'
import { SectionHeading } from '../components/SectionHeading.jsx'

export function ContactSection() {
  return (
    <section id="contact" className="border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Available for projects that need a clean front-end surface."
          description="Best entry point is email. The rest of the links stay lightweight and direct."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              Direct CTA
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex max-w-full items-center gap-2 break-all text-xl font-semibold tracking-tight text-[var(--text-primary)] transition hover:text-[var(--brand)] sm:text-2xl"
            >
              {profile.email}
              <span aria-hidden="true">→</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
              Email works best for briefs, scope, and timeline. Keep the message short and specific.
            </p>
          </div>

          <div className="grid gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-6 transition duration-300 hover:-translate-y-1 hover:bg-[var(--surface-secondary)] hover:shadow-[0_18px_45px_var(--shadow-color)]"
              >
                <p className="text-sm text-[var(--text-secondary)]">{social.label}</p>
                <p className="mt-2 break-all text-base font-medium text-[var(--text-primary)]">
                  {social.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
