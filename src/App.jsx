import { ThemeProvider } from './context/ThemeContext.jsx'
import { useEffect, useState } from 'react'
import profile from './data/profile.js'
import { SpotifyWidget } from './components/SpotifyWidget.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProjectsPage } from './pages/ProjectsPage.jsx'
import { SkillsPage } from './pages/SkillsPage.jsx'
import { applySeo } from './utils/seo.js'

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onNavigate = () => setPath(window.location.pathname)
    window.addEventListener('app:navigate', onNavigate)
    return () => window.removeEventListener('app:navigate', onNavigate)
  }, [])

  useEffect(() => {
    applySeo(path)
  }, [path])

  return (
    <ThemeProvider>
      {path === '/projects' ? (
        <ProjectsPage />
      ) : path === '/skills' ? (
        <SkillsPage />
      ) : (
        <HomePage />
      )}
      <SpotifyWidget playlistId={profile.spotifyPlaylistId} />
    </ThemeProvider>
  )
}
