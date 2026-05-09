import { ThemeProvider } from './context/ThemeContext.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ProjectsPage } from './pages/ProjectsPage.jsx'
import { SkillsPage } from './pages/SkillsPage.jsx'

export default function App() {
  const path = window.location.pathname

  return (
    <ThemeProvider>
      {path === '/projects' ? (
        <ProjectsPage />
      ) : path === '/skills' ? (
        <SkillsPage />
      ) : (
        <HomePage />
      )}
    </ThemeProvider>
  )
}
