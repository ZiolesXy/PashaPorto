# Portfolio

A modern personal portfolio built with React, Vite, and Tailwind CSS.

## Overview

This project presents selected work, technical skills, and contact information in a clean, responsive interface. It includes dedicated archive pages for projects and skills, with modal-based detail views for richer inspection.

## Key Features

- Responsive home page with hero, about, skills, projects, contact, and footer sections
- Project archive page with:
  - first 3 projects shown on the home page
  - full project list on a dedicated page
  - click-to-open project detail modal
  - thumbnail support for local images, image URLs, and web preview URLs
  - status badges for `live`, `coming-soon`, `maintenance`, and `unavailable`
- Skills archive page with:
  - first 3 skills shown on the home page
  - full skills list on a dedicated page
  - click-to-open skill detail modal
- Mobile navigation dropdown
- Theme switcher

## Pages

- `/` - Home
- `/projects` - Projects archive
- `/skills` - Skills archive

## Project Structure

```text
src/
  assets/
  components/
  context/
  data/
  hooks/
  pages/
  sections/
  utils/
```

## Data Files

### Projects

Project data is stored in:

- [`src/data/projects.json`](src/data/projects.json)

Example structure:

```json
{
  "id": "example-project",
  "title": "Example Project",
  "description": "Full description shown in the detail modal.",
  "stack": ["React", "Tailwind", "API"],
  "status": "live",
  "source": "https://github.com/example/repo",
  "linkproject": "https://example.com",
  "thumbnail": "/thumbnails/example.jpg"
}
```

Supported `status` values:

- `live`
- `coming-soon`
- `maintenance`
- `unavailable`

Supported `thumbnail` formats:

- Local file path from `public`
- Direct image URL
- Web preview URL

Examples:

```json
{ "thumbnail": "/thumbnails/example.jpg" }
```

```json
{ "thumbnail": "https://example.com/image.jpg" }
```

```json
{
  "thumbnail": "https://example.com",
  "thumbnailType": "web"
}
```

For local files, place the image in:

- `public/thumbnails/`

Then reference it as:

```json
{ "thumbnail": "/thumbnails/file-name.jpg" }
```

Note: web preview URLs depend on whether the target site allows iframe embedding.

### Skills

Skill data is stored in:

- [`src/data/skills.json`](src/data/skills.json)

Example structure:

```json
{
  "category": "Backend",
  "items": ["GO", "REST API", "API Design"]
}
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
