'use client'
import { updatedEntry } from '@/utils/api'
import React, { useState } from 'react'
import { useAutosave } from 'react-autosave'

export default function Editor(props: { entry: any }) {
  const { entry } = props
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updatedEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>...Loading</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
