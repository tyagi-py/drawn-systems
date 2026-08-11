# board-website

A personal website whose content is a collection of interactive, read-only
[Excalidraw](https://excalidraw.com) boards. There's no blog, no CMS, no
database — boards live as `.excalidraw` files in this repository and the site
discovers and renders them automatically.

Excalidraw is the content creation tool. This site is just a viewer and index.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a board

1. Draw the board in the Excalidraw app and save/export it as a `.excalidraw` file.
2. Create a new directory under `content/boards/<slug>/`.
3. Copy the file in as `board.excalidraw`.
4. Add a `metadata.json`:

   ```json
   {
     "title": "My Board",
     "description": "What this board is about.",
     "slug": "my-board",
     "category": "Systems",
     "published": true
   }
   ```

   `slug` must match the directory name exactly. Set `published: false` to
   keep a board out of the site while you work on it.

5. Run `npm run dev` — the board appears automatically at `/boards/my-board`.
6. Commit and push. No other code changes are required.

```text
content/
└── boards/
    └── my-board/
        ├── board.excalidraw
        └── metadata.json
```

## Validation

Checks every board directory for missing/invalid metadata, a missing or
unparsable `board.excalidraw`, and slug collisions. Exits non-zero if
anything is invalid — safe to run in CI before a deploy.

```bash
npm run validate
```

Other checks:

```bash
npm run typecheck
npm run lint
```

## Production build

The site is a fully static export — no Node.js server, database, or API at
runtime.

```bash
npm run build
```

Output goes to `out/`. Preview it locally with:

```bash
npm run start
```

## Deploying to GitHub Pages

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and
deploys `out/` automatically on every push to `main`.

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab).
5. Once the workflow finishes, the site is live at the URL shown on the
   Pages settings screen.

The workflow figures out the correct base path itself: a project site
(`https://<user>.github.io/<repo>/`) gets `NEXT_PUBLIC_BASE_PATH=/<repo>`
injected at build time; a user/org root site (a repo literally named
`<user>.github.io`) gets none. You don't need to configure anything by hand.

To reproduce that locally (e.g. to sanity-check a project-site build):

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

## Architecture notes

- **Discovery & validation** (`lib/boards.ts`) scans `content/boards/` at
  build time, validates each board, and filters to `published: true`. Nothing
  about individual boards is hardcoded.
- **Rendering** (`components/ExcalidrawViewer.tsx`) dynamically imports
  Excalidraw client-side only (`next/dynamic`, `ssr: false`) and renders it
  with `viewModeEnabled` — Excalidraw's built-in read-only mode. The editing
  toolbar, save/export/clear actions, and the theme toggle are hidden; pan,
  zoom, fit-to-content, and fullscreen remain available. There's no
  authentication — read-only is a UI constraint, not a security boundary,
  since the source `.excalidraw` files are public content in the repo either
  way.
- **Static export** (`next.config.ts`, `output: "export"`): every board route
  is generated at build time via `generateStaticParams`, so an unknown slug
  simply has no generated page and falls through to the static 404.
- **Dark mode** is a small inline boot script (sets `.dark` on `<html>`
  before paint, from `localStorage` or `prefers-color-scheme`) plus a
  `useSyncExternalStore`-based hook, avoiding both a flash of the wrong theme
  and an extra dependency.
- **Board previews**: cards show title/description/category only, no
  auto-generated thumbnail. Rendering a live Excalidraw canvas per card would
  mean loading Excalidraw's client bundle and every board's scene data on the
  homepage/`/boards` grid, which the plan explicitly avoids for performance.
