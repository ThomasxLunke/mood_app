import Link from 'next/link'
import type { ReactNode } from 'react'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { PageBackground } from '@/components/landing/PageBackground'

// Shell for the standalone /sign-in and /sign-up pages (reached by direct
// navigation, e.g. OAuth redirects) — mirrors the landing page's chrome
// (animated background, header bar) so they don't read as a bare,
// disconnected page. The primary entry point (header/hero CTA) opens
// Clerk's modal instead, staying on the landing page entirely.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col ">
      <PageBackground />

      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span
              aria-hidden
              className="h-6 w-6 rounded-md bg-gradient-to-br from-chart-1 via-chart-2 to-chart-4"
            />
            Mood-AI
          </Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
