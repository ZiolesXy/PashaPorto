import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function googleSiteVerificationPlugin(token: string): PluginOption {
  return {
    name: 'html-google-site-verification',
    transformIndexHtml() {
      if (!token) return []

      return [
        {
          tag: 'meta',
          attrs: {
            name: 'google-site-verification',
            content: token,
          },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const googleSiteVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim() || ''

  return {
    plugins: [react(), tailwindcss(), googleSiteVerificationPlugin(googleSiteVerification)],
  }
})
