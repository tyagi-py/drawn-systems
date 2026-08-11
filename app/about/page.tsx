import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Sumit.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-2xl font-medium">About</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          I&apos;m Sumit. I work at the intersection of AI, systems, and
          engineering, and I think visually — most of what I understand ends
          up as a diagram before it ends up as anything else.
        </p>
        <p>
          This site is a collection of those diagrams: boards I draw in{" "}
          <span className="text-foreground">Excalidraw</span> while working
          through how something works, then publish here as interactive,
          read-only visuals.
        </p>
        <p>
          There&apos;s no blog, no comments, no CMS — just boards, kept in a
          Git repository and published as static pages.
        </p>
      </div>
    </main>
  );
}
