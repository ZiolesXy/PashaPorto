export function applyTheme(themeObject) {
  if (!themeObject?.colors) return

  const root = document.documentElement

  Object.entries(themeObject.colors).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  root.setAttribute('data-theme', themeObject.id)
  document.body.dataset.theme = themeObject.id
}
