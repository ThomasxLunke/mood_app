'use client'

import { PenLine, TrendingUp, MessageCircleQuestion } from 'lucide-react'
import { SpotlightCard } from './SpotlightCard'

const STEPS = [
  {
    icon: PenLine,
    title: 'Écrivez, l’IA analyse',
    body: "Chaque entrée est envoyée à un LLM (via Langchain) qui génère résumé, note et couleur d'humeur.",
  },
  {
    icon: TrendingUp,
    title: 'Visualisez vos tendances',
    body: 'Les analyses sont agrégées dans des graphiques pour repérer vos tendances émotionnelles dans le temps.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Interrogez votre journal',
    body: "Une IA conversationnelle répond à vos questions en s'appuyant sur l'ensemble de vos entrées passées.",
  },
]

export function CommentSection() {
  return (
    <section id="comment" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Comment ça fonctionne ?
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance">
            Trois étapes, zéro effort de synthèse
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <SpotlightCard key={step.title} className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
