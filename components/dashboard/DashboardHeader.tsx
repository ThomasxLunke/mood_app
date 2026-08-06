'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Separator } from '@/components/ui/separator'

const NAV_LINKS = [
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'Historique' },
]

// Replaces the old sidebar. Real route-based active state (not the landing
// header's scroll-spy) — usePathname() + startsWith so /journal/[id] also
// lights up "Journal". No authSlot indirection needed like the landing
// header: everything under (dashboard) is already behind authMiddleware
// (see middleware.ts), so UserButton can be rendered directly, same as
// the layout already did before this component existed.
export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-md">
      <nav className="flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const active = pathname?.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              // See EntryToolbar's back-link for why: Next's client Router
              // Cache can serve a stale /journal after a create/delete
              // elsewhere in the same session.
              onClick={() => router.refresh()}
              className={
                active
                  ? 'rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground'
                  : 'rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-3">
        <DarkModeToggle />
        <UserButton afterSignOutUrl="/" />
        <Separator orientation="vertical" className="h-5" />
        <Link href="/" className="flex items-center gap-2 text-sm font-bold">
          <span
            aria-hidden
            className="h-5 w-5 rounded-md bg-gradient-to-br from-chart-1 via-chart-2 to-chart-4"
          />
          Mood-AI
        </Link>
      </div>
    </header>
  )
}
