export const SITE_URL = 'https://www.pasha.euphyfve.com'

const DEFAULT_DESCRIPTION =
  'Portfolio Pasha Prabasakti, web developer dari Jakarta yang fokus pada backend systems, REST API, PostgreSQL, dan aplikasi web yang maintainable.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

const pages = {
  '/': {
    title: 'Pasha Prabasakti | Web Developer',
    description: DEFAULT_DESCRIPTION,
    type: 'ProfilePage',
  },
  '/projects': {
    title: 'Projects | Pasha Prabasakti',
    description:
      'Archive proyek Pasha Prabasakti, mencakup aplikasi web React, Vite, Supabase, Go, PostgreSQL, dan sistem backend yang scalable.',
    type: 'CollectionPage',
  },
  '/skills': {
    title: 'Skills | Pasha Prabasakti',
    description:
      'Ringkasan skill Pasha Prabasakti dalam backend development, architecture, database design, REST API, PostgreSQL, Supabase, dan workflow engineering.',
    type: 'CollectionPage',
  },
}

function normalizePath(pathname = '/') {
  if (pathname === '/') return '/'

  const cleanPath = pathname.replace(/\/+$/, '')
  return pages[cleanPath] ? cleanPath : '/'
}

function absoluteUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function getSeoForPath(pathname = '/') {
  const path = normalizePath(pathname)

  return {
    ...pages[path],
    path,
    url: absoluteUrl(path),
    image: DEFAULT_IMAGE,
  }
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

function buildStructuredData(seo) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Pasha Prabasakti',
        url: `${SITE_URL}/`,
        jobTitle: 'Web Developer',
        email: 'mailto:pashaprabasakti@gmail.com',
        sameAs: [
          'https://github.com/ZiolesXy',
          'https://www.linkedin.com/in/pasha-prabasakti-60b7bb318',
        ],
        knowsAbout: ['Go', 'REST API', 'PostgreSQL', 'Supabase', 'React', 'Vite'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Pasha Prabasakti Portfolio',
        url: `${SITE_URL}/`,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': seo.type,
        '@id': `${seo.url}#webpage`,
        url: seo.url,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        image: seo.image,
      },
    ],
  }
}

function updateStructuredData(seo) {
  let element = document.getElementById('structured-data')

  if (!element) {
    element = document.createElement('script')
    element.id = 'structured-data'
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(buildStructuredData(seo))
}

export function applySeo(pathname = '/') {
  const seo = getSeoForPath(pathname)

  document.documentElement.lang = 'en'
  document.title = seo.title

  upsertCanonical(seo.url)
  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: seo.description,
  })
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index, follow, max-image-preview:large',
  })
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: seo.title,
  })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: seo.description,
  })
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: seo.url,
  })
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: seo.image,
  })
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: seo.title,
  })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: seo.description,
  })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: seo.image,
  })
  updateStructuredData(seo)
}
