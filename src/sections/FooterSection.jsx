import profile from '../data/profile.json'

function SocialIcon({ type }) {
  if (type === 'linkedin') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function FooterSection() {
  const currentYear = new Date().getFullYear()
  const footer = profile.footer

  return (
    <footer className="border-t border-[var(--border-color)] bg-transparent pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              {profile.name}
            </h2>
            <p className="max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
              {footer.intro}
            </p>

            <div className="mt-2 flex gap-4">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Navigasi
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
                {footer.navigation.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-[var(--text-primary)]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Fokus
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{footer.focus}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border-color)] pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[var(--text-secondary)]">
            © {currentYear} {profile.name}. {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
