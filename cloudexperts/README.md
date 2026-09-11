# Cloud Experts - MotionSites UI (React + Vite)

Modern cinematic site for [cloudexperts.com.ar](https://cloudexperts.com.ar), built with React, TypeScript, Vite, Tailwind CSS, and lucide-react. All original content, SEO URLs, analytics, and programmatic pages are preserved.

## Stack

- **React 19** + TypeScript + Vite
- **Tailwind CSS v4** — dark glass UI, scroll-scrubbed hero video
- **react-router-dom** — client routing
- **react-helmet-async** — per-page meta tags
- **Static generation** — 48 pre-rendered HTML pages for SEO

## Development

```bash
cd cloudexperts/web
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

This runs:

1. TypeScript check
2. Vite client bundle → `dist/`
3. SSR prerender for all routes (homepage + 47 SEO pages)
4. `sitemap.xml` generation

Output: `cloudexperts/web/dist/` — deploy this folder.

## Deploy to S3 + CloudFront

```bash
export S3_BUCKET=your-bucket-name
export CLOUDFRONT_ID=your-distribution-id   # optional
npm run deploy
```

Or manually:

```bash
aws s3 sync dist/ s3://your-bucket --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Independence from personal CV

This site is **separate** from the personal portfolio in `../leonardolarraquy/` (`leonardolarraquy.com.ar`). All assets are self-hosted under `cloudexperts.com.ar` — no cross-domain dependencies.

## Project structure

```
cloudexperts/
  web/                  ← React app (this is the live site source)
    src/
      components/       ScrollVideo, Navbar, home sections, Layout
      pages/            Home, Service, Technology, Location, Professional
      content/          Long-form service copy
      data/             data.json + constants
    scripts/
      prerender.ts      SSG for all routes
      generate-sitemap.ts
      deploy.sh
    dist/               Build output → deploy to S3/CloudFront
  data.json             Shared data (synced to web/src/data/)
  _legacy/              Previous static HTML site (archived)
  emails/               Email templates (unchanged)
```

## Analytics (preserved)

- **GTM:** `GTM-5RDR44JD` (in `index.html`)
- **GA4:** `G-71DZEPD7QH`
- **Form event:** `conversion_event_contact_2` on contact submit
- **Purchase helper:** `window.gtagSendEvent(url)` for delayed navigation tracking

## Adding content

1. Edit `src/data/data.json`
2. Update homepage constants in `src/data/constants.ts` if needed
3. Run `npm run build`
4. Deploy `dist/`

## Hero video

Production URL (CloudFront):

```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4
```

Optional local mirrors: `public/hero.mp4`, `public/hero-poster.jpg`

## URL structure (SEO)

All existing URLs are preserved:

```
/
/servicios/arquitectura-aws.html
/tecnologias/aws.html
/profesionales/arquitecto-aws-buenos-aires.html
/ubicaciones/argentina.html
```
