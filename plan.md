# Personal Visual Knowledge Website

## Objective

Build a modern, minimal personal website whose primary content is **interactive, read-only Excalidraw boards**.

This is **not a blog**, CMS, documentation platform, or article website.

The core idea is:

> I create `.excalidraw` files locally, place them into the project's content directory, and the website automatically makes them available as read-only interactive boards.

The `.excalidraw` files are the source of truth for the visual content.

The project should be simple enough that publishing a new board requires only adding a new directory containing an Excalidraw file and metadata.

---

# 1. Technology

Use:

* Next.js
* TypeScript
* Tailwind CSS
* Excalidraw
* Modern React
* ESLint
* Git

Use the latest stable versions that are compatible with each other.

Prefer the Next.js App Router.

Do not introduce unnecessary libraries.

---

# 2. Important constraints

Do NOT build:

* A blog
* A CMS
* A database
* Authentication
* User accounts
* Comments
* Likes
* Admin dashboard
* Backend API
* Editing functionality
* Cloud storage
* A complicated content management system

The website is primarily a viewer for my personal Excalidraw boards.

Keep the architecture simple and file-based.

---

# 3. Content architecture

Use this structure:

```text
content/
└── boards/
    ├── llm-agents/
    │   ├── board.excalidraw
    │   └── metadata.json
    │
    ├── rag/
    │   ├── board.excalidraw
    │   └── metadata.json
    │
    └── mlops/
        ├── board.excalidraw
        └── metadata.json
```

Each board directory must contain:

```text
board.excalidraw
metadata.json
```

Example:

```json
{
  "title": "LLM Agents",
  "description": "Visual exploration of how LLM-based agents work.",
  "slug": "llm-agents",
  "category": "AI",
  "published": true
}
```

Define a TypeScript type for board metadata.

Suggested type:

```ts
type BoardMetadata = {
  title: string;
  description?: string;
  slug: string;
  category?: string;
  published: boolean;
};
```

---

# 4. Board discovery

Create a server-side utility that scans:

```text
content/boards/
```

and discovers available boards.

The utility should:

1. Find board directories.
2. Read `metadata.json`.
3. Validate metadata.
4. Find `board.excalidraw`.
5. Return board information.
6. Ignore boards where `published` is false.

Do not hardcode individual boards.

If I add:

```text
content/boards/distributed-systems/
```

the website should automatically discover it.

---

# 5. Routes

Create these routes:

```text
/
```

Homepage.

```text
/boards
```

All published boards.

```text
/boards/[slug]
```

Individual board viewer.

```text
/about
```

Simple personal/about page.

---

# 6. Homepage

Create a clean, premium, minimal homepage.

The homepage should communicate:

* Personal identity
* Interest in AI / systems / engineering
* A visual collection of boards

Do not make it look like a blog.

Avoid:

* Blog cards
* Article dates
* Author/date metadata
* "Read more" article patterns
* Newsletter sections
* Blog terminology

Instead use terminology such as:

* Boards
* Visualizations
* Systems
* AI
* Experiments
* Knowledge

Example structure:

```text
------------------------------------------------

                    SUMIT

          AI • Systems • Engineering

      A collection of things I explore,
       understand, and visualize.

              [ Explore Boards ]

------------------------------------------------
```

Then show a visual board gallery.

Each board card should display:

* Title
* Description
* Category
* A preview/thumbnail if practical

Clicking the card should open:

```text
/boards/[slug]
```

---

# 7. Boards page

Create:

```text
/boards
```

This should display all published boards.

Use a responsive grid.

Each card should contain:

* Board title
* Short description
* Category
* Visual preview if practical
* Open/view action

Keep the UI clean and minimal.

---

# 8. Excalidraw viewer

This is the most important part of the application.

When a user visits:

```text
/boards/llm-agents
```

load:

```text
content/boards/llm-agents/board.excalidraw
```

and render it using Excalidraw.

The viewer must be **read-only**.

Users must NOT be able to:

* Edit elements
* Draw
* Delete
* Add shapes
* Change text
* Modify the scene
* Save modifications

The interface should feel like a dedicated visual viewer rather than the Excalidraw editor.

Enable useful viewing capabilities such as:

* Pan
* Zoom
* Fit to content
* Fullscreen if practical

Hide or disable editing controls.

Do not expose an editor toolbar unnecessarily.

---

# 9. Excalidraw loading

The `.excalidraw` file should be treated as JSON.

Create a reusable React component such as:

```text
components/
└── ExcalidrawViewer.tsx
```

It should receive the board scene/data and render it.

Example conceptual API:

```tsx
<ExcalidrawViewer
  elements={elements}
  appState={appState}
  files={files}
/>
```

Handle Excalidraw files correctly, including:

* elements
* appState
* files

Do not assume every `.excalidraw` file only contains elements.

If the Excalidraw package requires client-side rendering, isolate it properly using a client component/dynamic import.

---

# 10. Read-only security/model

The read-only restriction is primarily a UI/application constraint.

Do not build authentication just to enforce it.

The original `.excalidraw` files are public content.

Visitors should only receive the rendered/read-only experience.

Do not expose an "Edit in Excalidraw" button.

---

# 11. Board viewer UI

The viewer page should look approximately like:

```text
┌─────────────────────────────────────────────────────┐
│ ← Boards                          LLM Agents   ⛶   │
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│                                                     │
│                EXCALIDRAW CANVAS                   │
│                                                     │
│                                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│ LLM Agents                                          │
│ Visual exploration of LLM-based agents.             │
│                                                     │
│ AI · Agents                                         │
└─────────────────────────────────────────────────────┘
```

The canvas should receive most of the screen.

On desktop, aim for a very large canvas.

On mobile, ensure:

* Touch pan works
* Pinch zoom works
* UI doesn't obstruct the canvas
* Board metadata remains accessible

---

# 12. Board previews

If practical, generate board previews automatically.

Do not require manually-created thumbnails.

Possible approaches:

1. Render a lightweight preview using Excalidraw.
2. Generate static previews during build.
3. Use the board itself inside a small read-only viewer.

Choose the simplest reliable approach.

Do not introduce a complicated image-generation pipeline just for thumbnails.

If previews significantly complicate the architecture, omit them initially.

---

# 13. Navigation

Create a minimal navigation:

```text
SUMIT

Boards
About
```

On a board page:

```text
← Boards
```

Keep navigation intentionally minimal.

---

# 14. Design language

The design should feel:

* Technical
* Premium
* Minimal
* Modern
* Calm
* Developer-oriented

Avoid generic SaaS design.

Avoid excessive:

* Gradients
* Glassmorphism
* Huge animations
* Decorative UI
* Excessive cards
* Marketing language

The Excalidraw boards are the visual focus.

Use typography and whitespace heavily.

---

# 15. Dark mode

Support dark mode.

Use the system preference initially.

If practical, add a simple theme toggle.

The Excalidraw viewer should adapt appropriately to the selected theme.

Do not spend excessive effort creating a custom design system.

---

# 16. Metadata and SEO

Each board page should have appropriate metadata based on `metadata.json`.

For example:

```text
title:
LLM Agents — Sumit

description:
Visual exploration of how LLM-based agents work.
```

Generate dynamic metadata for:

```text
/boards/[slug]
```

The site should have sensible metadata for:

* Homepage
* Boards
* Individual boards
* About

---

# 17. Error handling

Implement proper handling for:

### Missing board

If:

```text
board.excalidraw
```

does not exist, show a useful error.

### Invalid JSON

If the Excalidraw file cannot be parsed, show a clear error instead of crashing the entire application.

### Invalid metadata

Validate metadata and report which board has invalid metadata.

### Unknown slug

Return a proper 404.

---

# 18. Type safety

Use TypeScript throughout.

Avoid:

```ts
any
```

unless absolutely necessary because of third-party Excalidraw types.

Create clear types for:

* Board metadata
* Board information
* Excalidraw scene data

---

# 19. Suggested project structure

Use approximately:

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── boards/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── about/
│       └── page.tsx
│
├── components/
│   ├── Navigation.tsx
│   ├── BoardCard.tsx
│   ├── BoardGrid.tsx
│   └── ExcalidrawViewer.tsx
│
├── content/
│   └── boards/
│       └── example/
│           ├── board.excalidraw
│           └── metadata.json
│
├── lib/
│   ├── boards.ts
│   └── excalidraw.ts
│
├── public/
│
├── types/
│   └── board.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

Adjust this structure if Next.js conventions suggest something better.

---

# 20. Example board

Create one example board so the application can be tested.

Create:

```text
content/boards/example/
```

with:

```text
board.excalidraw
metadata.json
```

The example metadata can be:

```json
{
  "title": "Example Board",
  "description": "An example interactive Excalidraw board.",
  "slug": "example",
  "category": "Example",
  "published": true
}
```

Use a simple valid Excalidraw scene for the example.

---

# 21. Developer experience

The most important developer workflow should be:

```text
1. Create board in Excalidraw
2. Save .excalidraw
3. Create content/boards/<slug>/
4. Copy board.excalidraw
5. Add metadata.json
6. Run npm run dev
7. Board automatically appears
8. Commit and push
```

Add this workflow clearly to `README.md`.

---

# 22. Validation

Add a simple validation mechanism that can detect:

* Missing metadata
* Invalid metadata
* Missing board file
* Invalid Excalidraw JSON
* Duplicate slugs

Ideally expose a command such as:

```bash
npm run validate
```

It should exit with a non-zero status if content is invalid.

---

# 23. Performance

The website should load quickly.

Important considerations:

* Do not load every Excalidraw board on the homepage.
* Only load the actual Excalidraw scene when visiting a board.
* Avoid shipping unnecessary editor functionality.
* Use Next.js code splitting.
* Lazy-load the Excalidraw viewer where appropriate.

Do not optimize prematurely.

First make the architecture clean and correct.

---

# 24. Accessibility

Implement:

* Keyboard navigation
* Proper link semantics
* Visible focus states
* Accessible navigation
* Meaningful page titles
* Accessible buttons
* Responsive design

The canvas itself should be treated as an interactive visual area.

---

# 25. Deployment

The application should work as a standard Next.js deployment.

Prefer a deployment model where:

```text
Git repository
      ↓
Vercel
      ↓
Website
```

No external database should be required.

The `.excalidraw` files should be part of the repository/build.

---

# 26. README

Create a clear README containing:

## Project overview

Explain that this is a personal website for publishing read-only Excalidraw boards.

## Development

```bash
npm install
npm run dev
```

## Adding a board

Explain:

```text
content/
└── boards/
    └── my-board/
        ├── board.excalidraw
        └── metadata.json
```

## Validation

```bash
npm run validate
```

## Production build

```bash
npm run build
npm run start
```

## Deployment

Explain how to deploy to Vercel.

---

# 27. Implementation approach

Before writing code:

1. Inspect the latest Excalidraw React API and determine the correct way to load `.excalidraw` scene data.
2. Confirm how to reliably disable editing/view in the current Excalidraw version.
3. Confirm how `.excalidraw` files represent:

   * elements
   * appState
   * files
4. Choose the simplest implementation compatible with the current version.

Do not blindly rely on an outdated Excalidraw API.

---

# 28. Important product principle

The most important principle is:

> The website is a viewer and index for my Excalidraw boards. Excalidraw is the content creation tool.

Do not turn the website into another drawing application.

I want to create content in Excalidraw and publish it through Git.

---

# 29. Build quality

After implementation:

1. Run TypeScript checks.
2. Run ESLint.
3. Run the content validation command.
4. Run a production build.
5. Fix all errors.
6. Verify:

   * Homepage
   * Boards page
   * Example board
   * Unknown board → 404
   * Invalid board handling
   * Mobile layout
   * Dark mode
   * Read-only behavior

Do not finish with known build errors.

---

# 30. Start implementation

First inspect the project directory.

If the project is empty, initialize the Next.js project.

Then implement the complete application described above.

Keep the codebase small and understandable.

Do not add features that were not requested.

At the end, provide:

1. A summary of the architecture.
2. Files created/modified.
3. Commands to run locally.
4. How to add a new Excalidraw board.
5. Any important Excalidraw/version-specific decisions.
6. Any limitations discovered during implementation.


# GitHub Pages Deployment Requirement

The website MUST be deployable entirely using GitHub Pages.

GitHub Pages is the primary and intended production hosting platform.

There must be:

* No Node.js production server
* No server-side API
* No database
* No server-side runtime requirement
* No Vercel-specific functionality
* No server actions
* No dynamically generated server routes at runtime

The final application must compile into static HTML, CSS, JavaScript, and static assets.

## Next.js Static Export

Configure Next.js for static export using:

```js
const nextConfig = {
  output: "export",
};
```

The production build should generate an `out/` directory that can be deployed directly to GitHub Pages.

All board routes must be generated statically during build time.

For:

```text
/boards/[slug]
```

use `generateStaticParams()` to discover all published boards and generate their pages during the build.

For example:

```text
content/boards/llm-agents
content/boards/rag
content/boards/mlops
```

should produce static routes equivalent to:

```text
/boards/llm-agents
/boards/rag
/boards/mlops
```

No runtime server should be required.

---

# GitHub Pages Base Path

Support deployment both as:

```text
username.github.io
```

and as a project site:

```text
username.github.io/repository-name/
```

Handle the GitHub Pages base path correctly for:

* JavaScript
* CSS
* Images
* Board assets
* Navigation
* Internal links
* Excalidraw assets

Do not hardcode root-relative URLs that break when the application is deployed under a repository subpath.

Prefer a centralized configuration for the site's base path.

---

# GitHub Actions Deployment

Create:

```text
.github/workflows/deploy.yml
```

The workflow should:

1. Checkout the repository.
2. Configure Node.js.
3. Install dependencies.
4. Run validation.
5. Run linting/type checking.
6. Build the static Next.js application.
7. Upload the generated `out/` directory.
8. Deploy it using GitHub Pages.

Use the official GitHub Pages deployment Actions where appropriate.

Deployment should happen automatically when changes are pushed to the main branch.

---

# Publishing Workflow

The intended workflow is:

```text
Create board in Excalidraw
        ↓
Save .excalidraw
        ↓
Copy into content/boards/<slug>/
        ↓
Add metadata.json
        ↓
git commit
        ↓
git push
        ↓
GitHub Actions
        ↓
Static build
        ↓
GitHub Pages
```

There should be no manual deployment step after `git push`.

---

# README

Update README.md with instructions for:

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static website should be available under:

```text
out/
```

## GitHub Pages setup

Explain how to:

1. Push the repository to GitHub.
2. Open repository Settings.
3. Open Pages.
4. Select GitHub Actions as the deployment source.
5. Push to `main`.
6. Wait for the deployment workflow.
7. Access the published website.

---

# Important

Do NOT recommend or configure Vercel.

GitHub Pages should be sufficient to host the entire application.

The final architecture should remain:

```text
Excalidraw
    ↓
.excalidraw files
    ↓
Git repository
    ↓
Next.js static build
    ↓
GitHub Actions
    ↓
GitHub Pages
```
