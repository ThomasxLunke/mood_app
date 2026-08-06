'use client'
import { updatedEntry } from '@/utils/api'
import React, { useRef, useState } from 'react'
import { useAutosave } from 'react-autosave'
import dayjs from 'dayjs'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { EntryToolbar, type SaveState } from './dashboard/EntryToolbar'
import { SentimentGauge } from './dashboard/SentimentGauge'

export default function Editor(props: { entry: any }) {
  const { entry } = props
  const [value, setValue] = useState(entry.content)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [lastSavedAt, setLastSavedAt] = useState(new Date(entry.updatedAt))
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // A freshly created entry has no analysis yet: it's only generated once
  // the user has actually written something and autosave has run.
  const { mood, summary, color, subject, sentimentScore, negative } =
    analysis ?? {}

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setSaveState('saving')
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current)
      try {
        const updated = await updatedEntry(entry.id, _value)
        if (updated) {
          setAnalysis(updated.analysis)
        }
        setLastSavedAt(new Date())
        setSaveState('saved')
        savedTimeoutRef.current = setTimeout(() => setSaveState('idle'), 2500)
      } catch (error) {
        console.error('Failed to save entry:', error)
        setSaveState('error')
      }
    },
  })

  return (
    <div className="flex min-h-full flex-col">
      <EntryToolbar
        entryId={entry.id}
        title={dayjs(entry.createdAt).format('DD/MM/YYYY HH:mm')}
        lastSavedLabel={`Modifié à ${dayjs(lastSavedAt).format('HH:mm')}`}
        saveState={saveState}
      />

      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Écrivez ici..."
          className="min-h-[240px] resize-none border-0 bg-transparent p-0 text-lg leading-relaxed shadow-none focus-visible:ring-0"
        />

        <div className="mt-10 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: color ?? 'hsl(var(--muted-foreground))',
                }}
              />
              <span className="text-base font-semibold">
                {mood ? mood.toUpperCase() : 'En attente d’analyse'}
              </span>
            </div>
            {negative && <Badge variant="destructive">NÉGATIF</Badge>}
          </div>

          {subject && (
            <p className="mt-1 text-sm italic text-muted-foreground">
              {subject}
            </p>
          )}

          <p className="mt-3 text-sm text-foreground/90">
            {summary ?? 'En attente de votre premier texte...'}
          </p>

          <div className="mt-4">
            <SentimentGauge score={sentimentScore ?? 0} />
          </div>
        </div>
      </div>
    </div>
  )
}
