import { useState } from 'react'
import profile from '../data/profile.js'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { GithubCard } from '../components/GithubCard.jsx'

export function AboutSection() {
  const about = profile.about
  const experience = profile.experience || []
  const [githubData, setGithubData] = useState(null)
  const languageStats = githubData?.languageStats || []

  return (
    <section id="about" className="border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.95fr_1fr]">
          <div className="space-y-6">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} description={profile.summary} />
            <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-7 sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                Experience detail
              </p>
              <div className="mt-5 space-y-5">
                {experience.map((item, index) => (
                  <div
                    key={`${item.company}-${item.period}`}
                    className={`grid gap-4 ${index === 0 ? 'pt-0' : 'pt-5'} sm:grid-cols-[120px_1fr]`}
                  >
                    <div className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                      {item.period}
                    </div>
                    <div className="space-y-1 border-l border-[var(--border-color)] pl-4">
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                        {item.company}
                      </h3>
                      <p className="text-sm leading-6 text-[var(--text-secondary)]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--border-color)] bg-[var(--brand-soft)] p-7 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)]">
              Programming language
            </p>
            <div className="mt-5 space-y-3">
              {languageStats.length ? (
                languageStats.map((item) => (
                  <div key={item.language} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-[var(--text-primary)]">{item.language}</span>
                      <span className="text-[var(--text-secondary)]">{item.percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-primary)]">
                      <div
                        className="h-full rounded-full bg-[var(--brand)] transition-all duration-500"
                        style={{ width: `${Math.max(item.percent, 4)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  {githubData ? 'No programming language data found.' : 'Fetching public repository data from GitHub.'}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <GithubCard username={profile.githubUsername} onLoad={setGithubData} />
          </div>
        </div>
      </div>
    </section>
  )
}
