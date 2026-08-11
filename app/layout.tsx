import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const excalifont = localFont({
  src: "./fonts/Excalifont-Regular.woff2",
  variable: "--font-excalifont",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Boards by Sumit Tyagi — AI, Systems, Engineering",
    template: "%s — Sumit",
  },
  description:
    "A collection of interactive visual boards exploring AI, systems, and engineering.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${excalifont.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
