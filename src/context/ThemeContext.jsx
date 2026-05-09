import { createContext, useEffect, useMemo, useState } from 'react'
import themes from '../data/themes.json'
import { applyTheme } from '../utils/applyTheme.js'

export const ThemeContext = createContext(null)
const STORAGE_KEY = 'portfolio-theme'
const defaultThemeId = 'ichigo'

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentThemeState] = useState(() => {
    if (typeof window === 'undefined') return defaultThemeId
    return localStorage.getItem(STORAGE_KEY) || defaultThemeId
  })

  const currentThemeObject = useMemo(
    () => themes.find((theme) => theme.id === currentTheme) || themes[0],
    [currentTheme],
  )

  useEffect(() => {
    applyTheme(currentThemeObject)
    localStorage.setItem(STORAGE_KEY, currentThemeObject.id)
  }, [currentThemeObject])

  const setTheme = (themeId) => {
    setCurrentThemeState(themeId)
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: currentThemeObject,
        currentThemeId: currentThemeObject.id,
        themes,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
