# Sumaira Arts

Contemporary Arabic calligraphy gallery, live event artistry, bespoke commissions, and workshop booking platform built with Next.js (App Router), React, TypeScript, and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev          # Start local dev server (http://localhost:3000)
npm run typecheck    # TypeScript check
npm run lint         # ESLint check
npm run build        # Production build
npm test             # Run colocated interaction tests
npm run test:watch   # Watch tests while developing
npm run storybook    # Browse isolated component states at localhost:6006
npm run build-storybook # Build the component catalogue
npm run verify       # Full lint, typecheck, build, size & contrast verification
```

## Component structure

Reusable UI lives in `src/components/atoms`, `molecules`, `organisms`, and
`templates`. Each named component folder exposes its public API through
`index.ts` and keeps its Storybook story and relevant behavior tests beside the
implementation. Public prop types live in `Component.types.ts` where needed.
Next.js route entries remain in `src/app`; shared data and services stay outside
the UI hierarchy. The pre-commit hook checks staged lint and formatting only;
run typecheck, tests, and both builds before merging a broad change.

## Environment

Copy `.env.example` to `.env.local` and configure:

| Variable                                                     | Purpose                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                       | Public origin for metadata, sitemap, and email links     |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_NAME` | Studio & client notification emails   |
| `ADMIN_EMAIL_CC`, `ENQUIRY_ADMIN_EMAIL`                      | Studio admin recipients for orders, bookings & enquiries |
| `GOOGLE_SHEETS_ID`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY` | Google Sheets tabs (`Orders`, `Live Events`, `Book Workshops`, `Contact Us`) |
