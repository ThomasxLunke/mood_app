'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { DeleteEntryDialog } from './DeleteEntryDialog'

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const SAVE_LABEL: Record<SaveState, string> = {
  idle: '',
  saving: 'Enregistrement...',
  saved: 'Enregistré',
  error: "Erreur d'enregistrement",
}

const DOT_CLASS: Record<SaveState, string> = {
  idle: '',
  saving: 'animate-pulse bg-muted-foreground',
  saved: 'bg-[hsl(var(--chart-2))]',
  error: 'bg-destructive',
}

export function EntryToolbar({
  entryId,
  title,
  lastSavedLabel,
  saveState,
}: {
  entryId: string
  title: string
  lastSavedLabel: string
  saveState: SaveState
}) {
  const router = useRouter()

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/journal"
          // A plain <Link> can serve /journal from Next's client-side
          // Router Cache — stale if a new entry was created since it was
          // last visited this session (revalidatePath only busts the
          // server cache, not this one). Force a refetch on click.
          onClick={() => router.refresh()}
          className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{lastSavedLabel}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {saveState !== 'idle' && (
          <span
            className={
              saveState === 'error'
                ? 'flex items-center gap-1.5 font-mono text-xs text-destructive'
                : 'flex items-center gap-1.5 font-mono text-xs text-muted-foreground'
            }
          >
            <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[saveState]}`} />
            {SAVE_LABEL[saveState]}
          </span>
        )}
        <DeleteEntryDialog entryId={entryId} />
      </div>
    </div>
  )
}
