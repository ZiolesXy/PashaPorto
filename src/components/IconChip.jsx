export function IconChip({ label, accent = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
        accent
          ? 'border-[var(--border-color)] bg-[var(--brand-soft)] text-[var(--text-primary)]'
          : 'border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--text-primary)]'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      {label}
    </span>
  )
}
