import CardSwap, { Card } from './CardSwap'
import { Badge } from '@/components/ui/badge'

// Illustrative entries, styled after the app's actual /journal card design
// (small mood dot + badge on a neutral surface, not a full-bleed color fill)
// so the hero preview reads as "this is really what the product looks like".
const EXAMPLE_ENTRIES = [
  {
    date: '06/08/2026 · 09:14',
    color: '#7FB8A6',
    summary:
      "Journée plutôt calme, un sentiment d'apaisement après une longue marche en fin d'après-midi.",
    mood: 'SEREIN',
  },
  {
    date: '07/08/2026 · 21:03',
    color: '#F5BE5B',
    summary:
      "Super journée : le projet sur lequel je travaille depuis des semaines a enfin abouti. Fatigué mais content.",
    mood: 'ENTHOUSIASTE',
  },
  {
    date: '08/08/2026 · 08:47',
    color: '#6C8CFF',
    summary:
      "Réveil difficile, pas mal de choses en tête pour la journée. Un café et ça devrait aller mieux.",
    mood: 'CONCENTRÉ',
  },
]

export function HeroPreview() {
  return (
    <div className="relative h-[420px] w-full max-w-xl">
      <CardSwap
        width={380}
        height={230}
        cardDistance={55}
        verticalDistance={60}
        delay={4000}
      >
        {EXAMPLE_ENTRIES.map((entry) => (
          <Card key={entry.date}>
            <div className="flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-muted-foreground">
                  {entry.date}
                </span>
                <Badge variant="secondary" className="gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.mood}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {entry.summary}
              </p>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  )
}
