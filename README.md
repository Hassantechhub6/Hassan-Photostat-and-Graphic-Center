# Hasan Photo Studio Graphic Center

Responsive React + TypeScript + Vite starter for the studio website.

## Run locally
1. Install Node.js LTS.
2. Extract this ZIP and open the folder in VS Code.
3. In the terminal run `npm install`
4. Run `npm run dev` and open the local URL shown by Vite.

## Included in this starter
- Urdu RTL admin-style interface and public website preview.
- Add and remove profile links; show/hide links.
- Edit business name, tagline, phone numbers and theme accent color.
- Browser-local draft persistence (localStorage).
- QR code generation and PNG download for the current origin.

## Important limitations
This is a functional UI prototype, not yet the complete production system described in the full specification. It does not yet include Supabase database/auth/storage, server-side authorization, publishing snapshots, image uploads, drag-and-drop editor, or production QR domain setup. The demo admin view is not protected and must not be deployed as a secure admin panel.

To complete production deployment:
- Create a Supabase project.
- Add migrations and Row Level Security policies before storing business data.
- Implement Supabase Auth and verify admin role on every write.
- Configure Storage buckets and upload validation.
- Set the final domain and generate the permanent QR for that domain.
- Test on mobile and desktop before publishing.
