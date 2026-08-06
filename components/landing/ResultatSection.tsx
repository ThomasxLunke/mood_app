'use client'

import HistoryChart from '@/components/HistoryCharts'

// Illustrative data for the marketing page — reuses the real HistoryChart
// component (the same one rendered on /history) instead of a hand-rolled
// chart, so the "result" shown is provably the actual product.
const MOCK_ANALYSES = [
  { createdAt: new Date('2026-07-31'), sentimentScore: -2, mood: 'fatigué', color: '#8892A6' },
  { createdAt: new Date('2026-08-01'), sentimentScore: 1, mood: 'calme', color: '#6C8CFF' },
  { createdAt: new Date('2026-08-02'), sentimentScore: 3, mood: 'content', color: '#37D6C4' },
  { createdAt: new Date('2026-08-03'), sentimentScore: 2, mood: 'neutre', color: '#8892A6' },
  { createdAt: new Date('2026-08-04'), sentimentScore: 5, mood: 'serein', color: '#7FB8A6' },
  { createdAt: new Date('2026-08-05'), sentimentScore: 4, mood: 'motivé', color: '#F5BE5B' },
  { createdAt: new Date('2026-08-06'), sentimentScore: 7, mood: 'enthousiaste', color: '#FF7A6E' },
]

export function ResultatSection() {
  return (
    <section id="resultat" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Le résultat
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance">
            Un aperçu clair de votre état émotionnel dans le temps
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sans effort de relecture — juste écrire, et laisser l&apos;IA
            faire la synthèse.
          </p>
        </div>
        <div className="mt-10 h-72 rounded-xl border bg-card p-4">
          <HistoryChart data={MOCK_ANALYSES} />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Exemple illustratif — vos propres tendances apparaissent dans
          l&apos;app.
        </p>
      </div>
    </section>
  )
}
