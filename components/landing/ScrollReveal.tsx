'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Generic reveal-on-scroll wrapper. Takes server-rendered `children` as a
// prop so most section content stays a Server Component — only this
// animation boundary needs to be client.
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
