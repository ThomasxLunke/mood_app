import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { notFound } from 'next/navigation'
import React from 'react'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function EntryPage(props: { params }) {
  const { params } = props
  const entry = await getEntry(params.id)

  // Wrong id, or another user's entry: 404 instead of crashing on
  // entry.content/entry.analysis below.
  if (!entry) notFound()

  return <Editor entry={entry} />
}
