import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// No AI analysis here on purpose: the entry is created with placeholder
// content nobody has read yet, so analyzing it would just burn LLM latency
// for nothing. The first real analysis happens on the PATCH triggered by
// autosave once the user has actually written something.
export const POST = async () => {
  try {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: 'Write about your day!',
      },
    })

    revalidatePath('/journal')
    return NextResponse.json({ data: entry })
  } catch (error) {
    console.error('Failed to create journal entry:', error)
    return NextResponse.json(
      { error: "Impossible de créer l'entrée pour le moment." },
      { status: 500 }
    )
  }
}
