'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HeroPreview } from './HeroPreview'

const TECH = ['Next.js', 'React', 'shadcn/ui', 'Prisma', 'Clerk', 'Langchain']

// authSlot is passed in from the (Server Component) page rather than
// imported here: AuthCta uses Clerk's server-side SignedIn/SignedOut, which
// a 'use client' file can't import directly, only receive as children/props.
//
// The ambient background (LiquidEther) is rendered once at the page level
// via <PageBackground/>, not per-section — it persists behind the whole
// page, not just the hero.
export function HeroSection({ authSlot }: { authSlot: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 sm:pb-32 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Journal + IA
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Un journal intime, éclairé par l&apos;IA.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Chaque entrée est analysée automatiquement : résumé, note et
            couleur d&apos;humeur générés par une IA. Visualisez vos
            tendances émotionnelles et posez des questions à l&apos;ensemble
            de votre journal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {authSlot}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="rounded-md border px-2 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  )
}
