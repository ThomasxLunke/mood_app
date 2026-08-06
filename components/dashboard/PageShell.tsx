import type { ReactNode } from 'react'

// Shared title+padding wrapper for /journal and /history — they used to
// duplicate an identical `p-10 bg-zinc-400/10` wrapper and an identical
// landing-hero-style centered <h1> (text-4xl font-extrabold ... text-balance),
// out of place on a working screen. No tinted backdrop here either: body's
// bg-background already gives the flat product-screen look.
export function PageShell({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {action}
      </div>
      {children}
    </div>
  )
}
