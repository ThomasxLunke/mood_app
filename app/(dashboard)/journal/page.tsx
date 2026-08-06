import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { PageShell } from '@/components/dashboard/PageShell'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()
  return (
    <PageShell title="Journal" action={<NewEntryCard />}>
      <div className="mb-8">
        <Question />
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune entrée pour le moment — cliquez sur «&nbsp;Nouvelle
          entrée&nbsp;» pour commencer.
        </p>
      ) : (
        <div className="relative space-y-4 pl-[22px]">
          <span
            aria-hidden
            className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-border"
          />
          {entries.map((entry) => (
            <div key={entry.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[22px] top-4 h-[11px] w-[11px] rounded-full ring-4 ring-background"
                style={{
                  backgroundColor:
                    entry.analysis?.color ?? 'hsl(var(--muted-foreground))',
                }}
              />
              <EntryCard entry={entry} />
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
