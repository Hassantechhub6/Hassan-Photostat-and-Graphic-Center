# Local run and deployment notes

## Local
`npm install`
`npm run dev`

## Build
`npm run build`
The production output is written to `dist/`.

## Hosting
Deploy `dist/` to Vercel or Cloudflare Pages after configuring the final domain. This starter currently stores demo edits in the browser only. Do not use it as a live admin system until Supabase Auth, database policies, server-side authorization, and the published-content workflow have been implemented and tested.

## Supabase environment
Copy `.env.example` to `.env.local` and set the project URL and public anon key. Never put a service-role key in frontend environment variables.
