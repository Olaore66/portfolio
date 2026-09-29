# Abraham Iborida · Portfolio

Personal portfolio of **Abraham Iborida**, full-stack software engineer building production mobile banking, payment and real-time systems.

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Motion** and **Lenis**.

## Features

- Animated preloader, letter-by-letter hero reveal, magnetic buttons and a custom cursor
- Smooth scrolling (Lenis) with scroll-linked parallax, text reveals and a velocity-driven tech marquee
- Stacking project cards linking to live apps on Google Play and the web
- Filterable, animated skills grid
- Separate About page with story, values, quick facts and an FAQ
- "Hire me" contact form that emails enquiries via [Resend](https://resend.com), with validation, a honeypot and rate limiting
- Six-colour palette (including an accent sampled from a portrait) and no off-palette colours: Tailwind's defaults are disabled
- Fully responsive, respects reduced-motion preferences

## Project structure

```
src/
├── app/
│   ├── page.js              # home page
│   ├── about/page.js        # about page
│   ├── api/contact/route.js # contact form endpoint (sends email)
│   ├── layout.js            # fonts, metadata, providers
│   └── globals.css          # palette and utilities
├── components/              # sections and animation primitives
└── data/portfolio.js        # all site content lives here
public/                      # photos, CV and project images
```

To update the content (bio, projects, skills, experience, FAQ), edit `src/data/portfolio.js`.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Contact form setup

The form sends email through Resend. Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
```

Restart the dev server after changing env vars. When deploying (e.g. Vercel), add the same variables in the host's environment settings. `.env.local` is git-ignored and must never be committed.

## Deploying

The easiest option is [Vercel](https://vercel.com/new): import this repository, add the environment variables above, and deploy.
