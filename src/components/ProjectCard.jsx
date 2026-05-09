import { motion } from 'framer-motion'
import { ExternalLink, Eye, Wrench, Clock3, CircleAlert, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import heroImg from '../assets/hero.png'
import { IconChip } from './IconChip.jsx'

const STATUS_META = {
  live: {
    label: 'Live',
    shortLabel: 'Live',
    icon: Play,
    className: 'bg-emerald-400/80 text-white',
  },
  'coming-soon': {
    label: 'Coming Soon',
    shortLabel: 'Soon',
    icon: Clock3,
    className: 'bg-amber-400/80 text-white',
  },
  maintenance: {
    label: 'Maintenance',
    shortLabel: 'Maint',
    icon: Wrench,
    className: 'bg-white/15 text-white',
  },
  unavailable: {
    label: 'Unavailable',
    shortLabel: 'Off',
    icon: CircleAlert,
    className: 'bg-red-400/80 text-white',
  },
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.unavailable
  const Icon = meta.icon

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md ${meta.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {meta.shortLabel}
    </span>
  )
}

export function ProjectCard({ project, index = 0 }) {
  const [open, setOpen] = useState(false)
  const previewImage = project.thumbnail || project.previewPath || heroImg
  const thumbnailIsWebPreview =
    typeof project.thumbnail === 'string' &&
    /^https?:\/\//i.test(project.thumbnail) &&
    !/\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(project.thumbnail)
  const previewHref = project.linkproject || project.source
  const summary = project.summary || project.description
  const cardDescription =
    summary.length > 110 ? `${summary.slice(0, 110).trimEnd()}...` : summary
  const visibleStack = project.stack.slice(0, 3)
  const statusMeta = STATUS_META[project.status] || STATUS_META.unavailable
  const StatusIcon = statusMeta.icon
  const isLive = project.status === 'live'
  const previewDisabled = !isLive || !previewHref

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <motion.article
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setOpen(true)
        }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.92] shadow-[0_18px_50px_var(--shadow-color)] transition duration-500 hover:-translate-y-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {thumbnailIsWebPreview ? (
            <iframe
              title={`${project.title} thumbnail preview`}
              src={previewImage}
              className="h-full w-full border-0 opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <img
              src={previewImage}
              alt={`${project.title} thumbnail`}
              className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.66))]" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="max-w-[70%] text-xl font-semibold tracking-tight text-white">
                {project.title}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                <StatusIcon className="h-3.5 w-3.5" />
                {statusMeta.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                <Eye className="h-3.5 w-3.5" />
                {project.linkproject ? 'Web Preview' : 'Preview'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col space-y-5 p-6">
          <p className="min-h-[4.5rem] text-sm leading-7 text-[var(--text-secondary)]">
            {cardDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {visibleStack.map((item) => (
              <IconChip key={item} label={item} />
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 opacity-0 transition duration-300 group-hover:opacity-100">
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              aria-disabled={previewDisabled}
              tabIndex={previewDisabled ? -1 : 0}
              onClick={(event) => event.stopPropagation()}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition ${
                previewDisabled
                  ? 'pointer-events-none bg-[var(--surface-secondary)] opacity-60'
                  : 'bg-[var(--brand)] hover:opacity-90'
              }`}
            >
              {previewDisabled
                ? 'Preview unavailable'
                : project.linkproject
                  ? 'Open Preview'
                  : 'View project'}
              <ExternalLink className="h-4 w-4" />
            </a>
            {project.source ? (
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
              >
                Source
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 sm:items-center sm:px-6"
              onClick={() => setOpen(false)}
              role="presentation"
            >
              <div
                className="relative mt-10 w-full max-w-4xl overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:mt-0"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--text-primary)] transition hover:opacity-80"
                  aria-label="Close project detail"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                  <img
                    src={previewImage}
                    alt={`${project.title} thumbnail`}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <div className="space-y-6 p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)]">
                          Project Detail
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                          {project.title}
                        </h3>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <IconChip key={item} label={item} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={previewHref}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={previewDisabled}
                        tabIndex={previewDisabled ? -1 : 0}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition ${
                          previewDisabled
                            ? 'pointer-events-none bg-[var(--surface-secondary)] opacity-60'
                            : 'bg-[var(--brand)] hover:opacity-90'
                        }`}
                      >
                        {previewDisabled
                          ? 'Preview unavailable'
                          : project.linkproject
                            ? 'Open Preview'
                            : 'View project'}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
