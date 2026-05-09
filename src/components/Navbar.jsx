import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import { ThemeSwitcher } from './ThemeSwitcher.jsx'

export function Navbar() {
  const activeId = useScrollSpy(['home', 'about', 'skills', 'projects', 'contact'])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileNavRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setMobileOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const navItems = [
    ['Home', '#home', 'home'],
    ['About', '#about', 'about'],
    ['Skills', '#skills', 'skills'],
    ['Projects', '#projects', 'projects'],
    ['Contact', '#contact', 'contact'],
  ]

  return (
    <motion.header
      className={`sticky top-0 z-40 border-b border-[var(--border-color)] backdrop-blur-2xl transition-all duration-300 ${
        scrolled ? 'bg-[color:var(--app-bg)/0.96] shadow-[0_16px_40px_var(--shadow-color)]' : 'bg-[color:var(--app-bg)/0.72]'
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="hidden shrink-0 rounded-full border border-[var(--border-color)] bg-[var(--surface-primary)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] md:inline-flex"
          >
            Portfolio
          </a>

          <div className="min-w-0 flex-1">
            <div className="hidden items-center gap-2 overflow-x-auto whitespace-nowrap rounded-full border border-[var(--border-color)] bg-[var(--surface-primary)] px-2 py-2 shadow-[0_12px_30px_var(--shadow-color)] md:flex">
              {navItems.map(([label, href, id]) => (
                <a
                  key={id}
                  href={href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    activeId === id
                      ? 'bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-[0_10px_30px_var(--shadow-color)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="relative md:hidden" ref={mobileNavRef}>
              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-full border border-[var(--border-color)] bg-[var(--surface-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[0_12px_30px_var(--shadow-color)]"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-dropdown"
              >
                <span className="inline-flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  Menu
                </span>
                <ChevronDown className={`h-4 w-4 transition ${mobileOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileOpen ? (
                <div
                  id="mobile-nav-dropdown"
                  className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-[var(--border-color)] bg-[var(--surface-primary)] shadow-[0_18px_50px_var(--shadow-color)]"
                >
                  <div className="flex flex-col p-2">
                    {navItems.map(([label, href, id]) => (
                      <a
                        key={id}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                          activeId === id
                            ? 'bg-[var(--surface-secondary)] text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span>{label}</span>
                        {activeId === id ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="shrink-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
