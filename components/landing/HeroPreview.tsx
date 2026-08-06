import CardSwap, { Card } from './CardSwap'

// Illustrative entries, styled after the real EntryCard (mood-color band +
// white/dark inner panel + badge) — cycling through a few examples makes
// the "AI analyzes every entry" pitch more concrete than a single static
// mock ever could.
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
    <div className="relative mx-auto h-[300px] w-full max-w-sm">
      <CardSwap
        width={300}
        height={190}
        cardDistance={36}
        verticalDistance={32}
        delay={4500}
        // pauseOnHover — désactivé volontairement : le carrousel doit
        // tourner en continu, sans que le survol puisse l'arrêter.
        skewAmount={4}
        easing="elastic"
      >
        {EXAMPLE_ENTRIES.map((entry) => (
          <Card key={entry.date}>
            <div
              className="flex h-full flex-col"
              style={{ backgroundColor: entry.color }}
            >
              <div className="px-4 pt-3 text-xs font-semibold">
                {entry.date}
              </div>
              <div className="m-2 flex flex-1 flex-col justify-between rounded-2xl bg-card p-4">
                <p className="text-sm leading-snug text-muted-foreground">
                  {entry.summary}
                </p>
                <span className="mt-3 inline-flex w-fit items-center rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-wide text-secondary-foreground">
                  {entry.mood}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  )
}
