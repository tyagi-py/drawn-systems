# newsletter-subscribe

Cloudflare Worker backing the subscribe form in the site footer. Stores emails
in D1 and posts a Discord notification on each new signup. Deployed
separately from the Next.js site — GitHub Pages only serves static files.

## One-time setup

```bash
cd worker
npm install
npx wrangler login

# Create the D1 database, then paste the returned database_id into
# wrangler.toml (replaces REPLACE_WITH_ID_FROM_WRANGLER_D1_CREATE).
npx wrangler d1 create newsletter

# Create the subscribers table, locally and on the remote database.
npm run db:init
npm run db:init:remote

# In Discord: Server Settings -> Integrations -> Webhooks -> New Webhook,
# copy its URL.
npx wrangler secret put DISCORD_WEBHOOK_URL
```

If the site isn't served from `https://drawnsystems.com`, update
`ALLOWED_ORIGIN` in `wrangler.toml` first (or CORS will reject the form's
requests).

## Deploy

```bash
npm run deploy
```

Prints the Worker's URL (`https://newsletter-subscribe.<subdomain>.workers.dev`).
Set that as `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT`:

- Locally: copy `.env.local.example` (repo root) to `.env.local` and paste it in.
- In production: repo Settings -> Secrets and variables -> Actions -> Variables
  -> add `SUBSCRIBE_ENDPOINT` with that URL, then re-run the deploy workflow.

## Checking subscribers / exporting for a send

```bash
npx wrangler d1 execute newsletter --remote --command "SELECT email, created_at FROM subscribers ORDER BY created_at DESC"
```

Add `--json > subscribers.json` to export, or open the `newsletter` database
in the Cloudflare dashboard (Workers & Pages -> D1).

## Local dev

```bash
npm run dev
```

Runs the worker against the local D1 replica at `http://localhost:8787`.
