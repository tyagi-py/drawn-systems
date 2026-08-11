import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navigation() {
  return (
    <header className="h-16 border-b border-border">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-5xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] uppercase"
        >
          Drawn Systems
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
