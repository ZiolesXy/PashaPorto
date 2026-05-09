import { motion } from 'framer-motion'
import { GitFork, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

function SkeletonLine({ className = '' }) {
  return <div className={`animate-pulse rounded-full bg-[var(--surface-secondary)] ${className}`} />
}

export function GithubCard({ username, onLoad }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) {
      setLoading(false)
      setError('Missing GitHub username')
      return
    }

    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
          }),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('Failed to load data')
        }

        const [user, repos] = await Promise.all([userRes.json(), reposRes.json()])
        const languageCounts = repos.reduce((acc, repo) => {
          if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1
          return acc
        }, {})
        const languageStats = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([language, count]) => ({
            language,
            count,
            percent: repos.length ? Math.round((count / repos.length) * 100) : 0,
          }))

        const nextData = { user, repos, languageStats }
        setData(nextData)
        onLoad?.(nextData)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load data')
        }
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [username])

  const repoCount = data?.user?.public_repos ?? 0
  const followerCount = data?.user?.followers ?? 0
  const bio = data?.user?.bio || 'Backend-minded builder shipping clean and maintainable systems.'
  const languageStats = data?.languageStats || []

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="group rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-5 shadow-[0_16px_40px_var(--shadow-color)] transition duration-300 hover:scale-[1.015] hover:border-[var(--brand-soft)] hover:shadow-[0_22px_55px_var(--shadow-color)]"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          {loading ? (
            <div className="h-16 w-16 rounded-2xl bg-[var(--surface-secondary)] animate-pulse" />
          ) : data?.user?.avatar_url ? (
            <img
              src={data.user.avatar_url}
              alt={`${username} avatar`}
              className="h-16 w-16 rounded-2xl object-cover ring-1 ring-[var(--border-color)]"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] text-sm font-semibold text-[var(--text-primary)]">
              {username?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--text-secondary)]"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">GitHub</p>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            {loading ? <SkeletonLine className="h-6 w-40" /> : `@${data?.user?.login || username}`}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {loading ? <SkeletonLine className="h-4 w-full" /> : bio}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Repos</p>
          <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
            {loading ? <SkeletonLine className="h-6 w-10" /> : repoCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Followers</p>
          <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
            {loading ? <SkeletonLine className="h-6 w-10" /> : followerCount}
          </p>
        </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Top</p>
            <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
              {loading ? <SkeletonLine className="h-6 w-14" /> : languageStats[0]?.language || 'N/A'}
            </p>
          </div>
        </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(loading
          ? ['Loading']
          : languageStats.length
            ? languageStats.slice(0, 3).map((item) => item.language)
            : ['No languages']
        ).map((language) => (
          <span
            key={language}
            className="rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] px-3 py-1 text-xs text-[var(--text-primary)]"
          >
            {language}
          </span>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
        <Users className="h-3.5 w-3.5" />
        <span>Public profile snapshot</span>
        <GitFork className="h-3.5 w-3.5" />
      </div>
    </motion.article>
  )
}
