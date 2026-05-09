import { useMemo } from 'react'
import { useTheme } from '../hooks/useTheme.js'
import { Pointer } from 'lucide-react'

export function ThemeSwitcher() {
  const { themes, currentThemeId, setTheme } = useTheme()

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === currentThemeId) || themes[0],
    [themes, currentThemeId],
  )

  return (
    <div className="min-w-0">
      <label className="sr-only" htmlFor="theme-switcher">
        Theme switcher
      </label>
      <div className="flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--surface-primary)] px-3 py-2 shadow-[0_10px_30px_var(--shadow-color)]">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
        <select
          id="theme-switcher"
          value={activeTheme.id}
          onChange={(event) => setTheme(event.target.value)}
          className="min-w-0 appearance-none border-0 bg-[var(--surface-primary)] text-sm font-medium text-[var(--text-primary)] outline-none"
          style={{
            color: 'var(--text-primary)',
            backgroundColor: 'var(--surface-primary)',
          }}
        >
          {themes.map((theme) => (
            <option
              key={theme.id}
              value={theme.id}
              style={{
                cursor: Pointer,
                backgroundColor: 'var(--surface-primary)',
                color: 'var(--text-primary)',
              }}
            >
              {theme.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
