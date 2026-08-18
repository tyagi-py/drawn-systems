import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navigation() {
  return (
    <header className="h-20 border-b border-border">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-5xl items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center gap-2.5 leading-tight">
          <Logo className="h-7 w-7 shrink-0" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.2em] uppercase">
              Drawn Systems
            </span>
            <span className="block text-xs text-muted">by Sumit Tyagi</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/boards"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Boards
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/subscribe"
            className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Subscribe
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
