'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NewEntryCard() {
  const router = useRouter()
  const handleOnClick = async () => {
    const data = await createNewEntry()
    console.log(data)
    router.push(`/journal/${data.id}`)
  }

  return (
    <div
      className="cursor-pointer rounded-3xl overflow-hidden dark:bg-[#131621] dark:border-[#030712] dark:border bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">+ Nouvelle entrée</span>
      </div>
    </div>
  )
}
