import React from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { DeleteEntryDialog } from './dashboard/DeleteEntryDialog'

// Timeline-item content — the colored dot lives on the rail in
// journal/page.tsx, not here. `analysis.color` is an unvalidated
// free-form string from the LLM (no enum/regex in the schema), so it's
// only ever used at full opacity for a tiny dot — safe regardless of
// format, unlike a tinted background would be.
//
// The Link and the delete trigger are siblings, not nested — a <button>
// inside an <a> is invalid HTML and needs stopPropagation hacks to avoid
// triggering navigation. Overlaying them via absolute positioning instead
// keeps both fully interactive with no bubbling workaround.
export default function EntryCard(props: { entry: any }) {
  const { entry } = props
  const date = dayjs(entry.createdAt).format('DD/MM/YYYY HH:mm')

  return (
    <div className="group relative rounded-lg border bg-card transition-colors hover:border-foreground/20">
      <Link href={`/journal/${entry.id}`} className="block p-4 pr-11">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {date}
          </span>
          {entry.analysis && (
            <Badge variant="secondary" className="gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: entry.analysis.color }}
              />
              {entry.analysis.mood.toUpperCase()}
            </Badge>
          )}
        </div>
        <p className="line-clamp-3 text-sm text-foreground/90">
          {entry.analysis?.summary ?? 'Analyse en attente...'}
        </p>
      </Link>

      {/* Same spot on every card, hidden until hover/focus. */}
      <div className="absolute right-3 top-3 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <DeleteEntryDialog entryId={entry.id} />
      </div>
    </div>
  )
}
