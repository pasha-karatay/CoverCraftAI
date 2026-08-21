# CoverCraft AI

CoverCraft AI generates concise, personalized cover letters from a job description, candidate experience, and selected tone. It also supports revising a generated letter from user feedback and summarizing a TXT resume.

## Live Demo

[Open CoverCraft AI](https://nextjs-2wxhz1hph-me-b469.vercel.app/)

## Stack

- Next.js 13.5 with App Router and Pages API route
- React 18 and TypeScript
- Tailwind CSS and Radix UI components
- Groq API with `openai/gpt-oss-120b`
- Vercel for deployment
- Sonner for toast notifications

## Features

- Generate a cover letter from company, position, experience, and tone
- Regenerate and revise letters with feedback
- Upload a TXT resume and extract a short summary
- Local generation history for the current browser session
- Light and dark theme support
- Responsive UI with reduced-motion support

## Local Development

Requirements: Node.js 18+ and a Groq API key.

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run build
```

## Vercel Deployment

1. Import `https://github.com/pasha-karatay/CoverCraftAI` into Vercel.
2. In **Project Settings -> Environment Variables**, add `GROQ_API_KEY` for Production and Preview.
3. Deploy the `main` branch.
4. After changing the environment variable, redeploy so the serverless functions receive the new value.

Vercel runs the standard Next.js build automatically. No public API key is required in the browser.

## Security Notes

- Keep the real Groq key in `.env.local` and Vercel Environment Variables only.
- Never commit `.env.local` or paste API keys into source files.
- `GROQ_API_KEY` is read only by server-side API routes.
- The `.env.example` file contains a placeholder, not a working secret.

## API Routes

- `POST /api/generate` - generate a cover letter
- `POST /api/revise` - revise an existing letter
- `POST /api/extract-resume` - summarize TXT resume text
