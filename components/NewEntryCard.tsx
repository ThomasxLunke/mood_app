'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

// Same create/redirect logic as before — timeline layout (Option C) moves
// this out of the entry grid into the page toolbar, so it's now a Button
// instead of a card tile.
export default function NewEntryCard() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleOnClick = async () => {
    if (isCreating) return
    setIsCreating(true)
    try {
      const data = await createNewEntry()
      if (data) {
        router.push(`/journal/${data.id}`)
      } else {
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Failed to create entry:', error)
      setIsCreating(false)
    }
  }

  return (
    <Button onClick={handleOnClick} disabled={isCreating} className="gap-2">
      {isCreating ? <Spinner /> : <Plus className="h-4 w-4" />}
      {isCreating ? 'Création...' : 'Nouvelle entrée'}
    </Button>
  )
}
