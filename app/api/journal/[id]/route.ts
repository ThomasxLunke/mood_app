import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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

export const DELETE = async (req: Request, { params }) => {
  try {
    const user = await getUserByClerkID()
    // Analysis has no onDelete cascade from JournalEntry in the schema (only
    // Analysis.user does) — delete it first, in a transaction, rather than
    // assume a DB-level cascade that isn't actually configured.
    await prisma.$transaction([
      prisma.analysis.deleteMany({
        where: { entryId: params.id, userId: user.id },
      }),
      prisma.journalEntry.delete({
        where: { userId_id: { userId: user.id, id: params.id } },
      }),
    ])

    revalidatePath('/journal')
    return NextResponse.json({ data: { id: params.id } })
  } catch (error) {
    console.error('Failed to delete journal entry:', error)
    return NextResponse.json(
      { error: "Impossible de supprimer l'entrée pour le moment." },
      { status: 500 }
    )
  }
}
