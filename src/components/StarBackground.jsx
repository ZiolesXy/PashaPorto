import { motion } from 'framer-motion'

const stars = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  size: 2 + (index % 3),
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 100}%`,
  duration: 5 + (index % 5),
  delay: (index % 6) * 0.4,
}))

export function StarBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--brand-soft),transparent_25%),radial-gradient(circle_at_bottom_right,var(--surface-accent),transparent_28%)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.25)',
          }}
          animate={{ opacity: [0.15, 0.8, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
        />
      ))}
    </div>
  )
}
