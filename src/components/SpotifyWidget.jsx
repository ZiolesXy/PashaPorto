import { AnimatePresence, motion } from 'framer-motion'
import { Music2, X } from 'lucide-react'
import { useState } from 'react'

export function SpotifyWidget({ playlistId }) {
  const [open, setOpen] = useState(false)

  if (!playlistId) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--surface-primary)] shadow-[0_18px_50px_var(--shadow-color)] transition-all duration-300 ${
          open ? 'w-[280px]' : 'w-12'
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <p
            className={`text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)] transition-all duration-300 ${
              open ? 'opacity-100' : 'pointer-events-none w-0 overflow-hidden opacity-0'
            }`}
          >
            Spotify
          </p>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            aria-label={open ? 'Collapse Spotify widget' : 'Open Spotify widget'}
          >
            {open ? <X className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? 'max-h-[352px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <iframe
            title="Spotify playlist"
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="h-[352px] w-full border-0"
          />
        </div>
      </motion.div>
    </div>
  )
}
