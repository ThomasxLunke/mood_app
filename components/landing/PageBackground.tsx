'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useReducedMotion } from 'motion/react'
import LiquidEther from './LiquidEther'

// Mood-spectrum accent colors, echoing the app's actual mood -> color
// mechanic instead of reactbits' default purple/pink.
const LIQUID_COLORS = ['#6C8CFF', '#37D6C4', '#FFB199']

// Low-velocity areas fade toward this color. Transparent black reads fine
// on the dark theme but shows up as a grey haze muddying text on the
// light theme, so fade toward white there instead.
const BG_COLOR_DARK: [number, number, number, number] = [0, 0, 0, 0]
const BG_COLOR_LIGHT: [number, number, number, number] = [1, 1, 1, 0]

// Full-page persistent background, fixed behind every section. The WebGL
// simulation runs continuously while the page/tab is open (LiquidEther
// itself pauses on tab-hidden and when scrolled fully out of view) — a
// real GPU/battery cost, chosen deliberately over a lighter hero-only
// treatment.
export function PageBackground() {
  const shouldReduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  // Avoid a hydration/theme-flash mismatch: default to the dark-mode
  // baseline (matches the CSS default) until the real theme resolves.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const bgColor =
    mounted && resolvedTheme === 'light' ? BG_COLOR_LIGHT : BG_COLOR_DARK

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 dark:opacity-50"
    >
      {' '}
      {shouldReduceMotion ? (
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#6C8CFF,transparent_45%),radial-gradient(circle_at_70%_60%,#37D6C4,transparent_45%),radial-gradient(circle_at_50%_90%,#FFB199,transparent_45%)]" />
      ) : (
        <LiquidEther
          colors={LIQUID_COLORS}
          bgColor={bgColor}
          mouseForce={22}
          cursorSize={130}
          resolution={0.5}
          isViscous={false}
          autoDemo
          autoSpeed={0.6}
          autoIntensity={2.4}
          takeoverDuration={0.25}
          autoResumeDelay={800}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}
