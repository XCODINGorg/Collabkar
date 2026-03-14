# Backend

Simple Express backend for the frontend.

## Endpoints

- `GET /health` → `{ ok: true }`
- `POST /api/waitlist` → saves waitlist submissions (webhook or local CSV)
- `POST /api/pricing-suggestion` → returns pricing suggestion JSON

## Environment

Create `backend/.env` (or set env vars in your shell):

```bash
PORT=4001
CORS_ORIGIN=http://localhost:3000
WAITLIST_FILE_PATH=C:\path\to\waitlist-emails.csv
WAITLIST_WEBHOOK_URL=https://your-pc-bridge-url.example.com/waitlist
```

## Run

```bash
cd backend
npm install
npm run dev
```
