'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Spinner } from './ui/spinner'

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
    <div
      aria-disabled={isCreating}
      className={`rounded-3xl overflow-hidden dark:bg-[#131621] dark:border-[#030712] dark:border bg-white shadow ${
        isCreating ? 'cursor-wait opacity-70' : 'cursor-pointer'
      }`}
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6 flex items-center gap-3">
        {isCreating ? (
          <>
            <Spinner />
            <span className="text-3xl">Création...</span>
          </>
        ) : (
          <span className="text-3xl">+ Nouvelle entrée</span>
        )}
      </div>
    </div>
  )
}
