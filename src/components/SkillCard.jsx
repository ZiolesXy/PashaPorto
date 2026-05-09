import { motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconChip } from './IconChip.jsx'

export function SkillCard({ skill }) {
  const [open, setOpen] = useState(false)

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
        className="group flex h-full cursor-pointer flex-col rounded-[24px] border border-[var(--border-color)] bg-[var(--surface-primary)] p-6 transition duration-300 hover:-translate-y-1 hover:bg-[var(--surface-secondary)] hover:shadow-[0_18px_45px_var(--shadow-color)]"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
            {skill.category}
          </h3>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] transition duration-300 group-hover:bg-[var(--surface-primary)] group-hover:text-[var(--text-primary)]">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--surface-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
            Click to see detail
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
                className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--surface-primary)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:mt-0"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--text-primary)] transition hover:opacity-80"
                  aria-label="Close skill detail"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="max-h-[90vh] overflow-y-auto space-y-6 p-6 sm:p-8">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)]">
                      Skill Detail
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <IconChip key={item} label={item} accent />
                    ))}
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
