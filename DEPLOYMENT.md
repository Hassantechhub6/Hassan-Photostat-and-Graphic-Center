# Run and deployment

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```
The production website is written to `dist/`. Deploy the contents of `dist/` to a static host such as GitHub Pages, Vercel or Cloudflare Pages. The Vite config uses relative asset paths to support project subpaths.

## Before going live
1. Replace the sample Facebook, Instagram and TikTok URLs with the real profile URLs in the link manager.
2. Verify both contact numbers and all service prices.
3. Test WhatsApp, phone and social links on a mobile device.
4. Generate the final QR code only after the public website URL is live.

## Admin limitations
The included manager saves settings in the current browser's `localStorage`. It is not password-protected, does not sync across devices, and does not automatically publish edits to the hosted site. Do not expose it as a secure production admin panel. Supabase Auth, database Row Level Security, storage and a publishing workflow are required for a real multi-device admin system.
