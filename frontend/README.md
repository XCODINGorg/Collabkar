This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Waitlist Email Capture

The waitlist modal now sends emails to `POST /api/waitlist`.

- Local file mode (default): appends to `data/waitlist-emails.csv` (Excel can open this file directly).
- Bridge mode (recommended for Vercel): set `WAITLIST_WEBHOOK_URL` and the app forwards each email to that URL, so you can write into an Excel file on your own PC.

If you run the separate backend in `../backend`, set this in `frontend/.env.local` so the frontend calls it:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:4001
```

Optional environment variables:

```bash
WAITLIST_FILE_PATH=C:\path\to\waitlist-emails.csv
WAITLIST_WEBHOOK_URL=https://your-pc-bridge-url.example.com/waitlist
```

Important: if you deploy on Vercel without `WAITLIST_WEBHOOK_URL`, file writes are temporary and not persistent.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
