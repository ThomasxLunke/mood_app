'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DarkModeToggle } from '@/components/DarkModeToggle'

const NAV_LINKS = [
  { id: 'pourquoi', label: 'Pourquoi' },
  { id: 'comment', label: 'Comment' },
  { id: 'resultat', label: 'Résultat' },
  { id: 'stack', label: 'Stack' },
]

// authSlot is passed in from the (Server Component) page rather than
// imported here: AuthCta uses Clerk's server-side SignedIn/SignedOut, which
// a 'use client' file can't import directly, only receive as children/props.
export function LandingHeader({ authSlot }: { authSlot: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    // Single deterministic source of truth, computed straight from scroll
    // position on every scroll tick — no IntersectionObserver. Two
    // separate listeners (band observer + bottom check) were racing each
    // other on every scroll event and clobbering one another's result.
    const REFERENCE_LINE = 96 // just below the sticky header (h-16 + margin)

    const updateActive = () => {
      // Generous tolerance: at fractional device pixel ratios (125%/150%
      // Windows scaling is common) innerHeight/scrollHeight are rounded
      // integers while scrollY is subpixel-precise, so an exact "at the
      // very bottom" scroll position can land a few px short of equality.
      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 40
      if (atBottom) {
        setActiveId('stack')
        return
      }

      // Walk sections top to bottom; the active one is the last whose top
      // has already scrolled past the reference line — i.e. the section
      // currently "under" the header.
      let current: string | null = null
      for (const link of NAV_LINKS) {
        if (link.id === 'stack') continue
        const el = document.getElementById(link.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= REFERENCE_LINE) {
          current = link.id
        }
      }
      setActiveId(current ?? NAV_LINKS[0].id)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-bold">
          <span
            aria-hidden
            className="h-6 w-6 rounded-md bg-gradient-to-br from-chart-1 via-chart-2 to-chart-4"
          />
          Mood-AI
        </a>

        {/* Pure scroll indicator — not clickable, only reflects scroll position. */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <span
              key={link.id}
              className={
                activeId === link.id
                  ? 'relative rounded-full px-3 py-1.5 text-sm text-foreground'
                  : 'relative rounded-full px-3 py-1.5 text-sm text-muted-foreground'
              }
            >
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {link.label}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <DarkModeToggle />
            {authSlot}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation et connexion
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => {
                      setActiveId(link.id)
                      setMobileOpen(false)
                    }}
                    className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
                <DarkModeToggle />
                {authSlot}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
