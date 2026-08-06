import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  try {
    const { content } = await req.json()
    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
      data: {
        content,
      },
    })

    const analysis = await analyze(updatedEntry.content)

    const updated = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      update: { ...analysis },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        ...analysis,
      },
    })

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
  } catch (error) {
    console.error('Failed to update journal entry:', error)
    return NextResponse.json(
      { error: "Impossible d'analyser l'entrée pour le moment." },
      { status: 500 }
    )
  }
}
