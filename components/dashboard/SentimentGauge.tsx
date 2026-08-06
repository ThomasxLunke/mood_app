import { cn } from '@/lib/utils'

// sentimentScore is diverging around 0 (-10..10), so it gets two hues +
// a neutral track, not an arbitrary categorical color. Pair validated with
// the dataviz skill's palette validator: --chart-1 (negative pole) /
// --chart-2 (positive pole) — passes contrast + CVD checks in both themes.
// The numeric label is always shown alongside the marker so identity never
// depends on hue alone (the dark pairing's lightness-band check is
// borderline on --chart-2's own pre-existing dark value).
export function SentimentGauge({
  score,
  compact = false,
  className,
}: {
  score: number
  compact?: boolean
  className?: string
}) {
  const clamped = Math.max(-10, Math.min(10, score))
  const pct = ((clamped + 10) / 20) * 100
  const color = clamped >= 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-1))'
  const markerSize = compact ? 7 : 10

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'relative flex-1 rounded-full bg-border',
          compact ? 'h-1' : 'h-1.5'
        )}
      >
        <span
          aria-hidden
          className="absolute -top-0.5 bottom-0 left-1/2 w-px bg-muted-foreground/40"
        />
        <span
          aria-hidden
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background"
          style={{
            left: `${pct}%`,
            width: markerSize,
            height: markerSize,
            backgroundColor: color,
          }}
        />
      </div>
      <span
        className={cn(
          'shrink-0 font-mono font-semibold tabular-nums',
          compact ? 'text-xs' : 'text-sm'
        )}
        style={{ color }}
      >
        {clamped > 0 ? '+' : ''}
        {clamped}
      </span>
    </div>
  )
}
