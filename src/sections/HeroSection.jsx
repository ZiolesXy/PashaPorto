import { motion } from 'framer-motion'
import { Briefcase, Download, MousePointerClick } from 'lucide-react'
import profile from '../data/profile.js'

const codeSnippets = [
  `import { Portfolio } from '${profile.name.toLowerCase().replace(/\s+/g, '')}.dev';`,
  '',
  `const developer = new Portfolio({`,
  `  name: '${profile.name}',`,
  `  stack: [${profile.stack.map((s) => `'${s}'`).join(', ')}],`,
  `  focus: '${profile.role}',`,
  `  status: '${profile.availability}'`,
  `});`,
  '',
  'await developer.launchPortfolio();',
  '// Clean architecture, data-driven UI, theme system',
  '',
  "console.log('Let's build something exceptional.');",
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mt-0 grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.8] px-4 py-2 text-sm text-[var(--text-secondary)] backdrop-blur-md"
          >
            <Briefcase className="h-4 w-4 text-[var(--brand)]" />
            Open for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.02] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
          >
            <span className="block">I&apos;m {profile.name}</span>
            <span className="mt-3 block bg-gradient-to-r from-[var(--brand)] via-[var(--text-primary)] to-[var(--brand)] bg-clip-text text-transparent">
              {profile.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.8] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[var(--surface-secondary)]"
            >
              Contact Me
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-[28px] border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.88] p-5 shadow-[0_24px_70px_var(--shadow-color)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <div className="ml-auto text-sm font-medium text-[var(--text-secondary)]">
                portfolio.js
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-5 font-mono text-sm leading-7 text-[var(--text-primary)]">
              {codeSnippets.map((line, index) => (
                <div key={index} className="min-h-6 whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-4">
                <p className="text-sm text-[var(--text-secondary)]">Location</p>
                <p className="mt-2 font-semibold text-[var(--text-primary)]">{profile.location}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-secondary)] p-4">
                <p className="text-sm text-[var(--text-secondary)]">Availability</p>
                <p className="mt-2 font-semibold text-[var(--text-primary)]">{profile.availability}</p>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-4 -right-4 rounded-2xl border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.9] p-4 shadow-[0_18px_50px_var(--shadow-color)] backdrop-blur-md"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Download className="h-5 w-5 text-[var(--brand)]" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[color:var(--surface-primary)/0.8] px-4 py-2 text-xs text-[var(--text-secondary)] backdrop-blur-md">
          <MousePointerClick className="h-3.5 w-3.5" />
          Scroll to explore
        </div>
      </motion.div>
    </section>
  )
}
