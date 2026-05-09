export function ProjectFilter({ options, value, onChange }) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface-primary)] p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            value === option
              ? 'bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-[0_10px_30px_var(--shadow-color)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
