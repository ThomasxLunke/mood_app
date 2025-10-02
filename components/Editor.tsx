'use client'
import { updatedEntry } from '@/utils/api'
import React, { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { Spinner } from './ui/spinner'
import { Badge } from './ui/badge'

export default function Editor(props: { entry: any }) {
  const { entry } = props
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis
  const analysisData = [
    { name: 'Résumé', value: summary },
    { name: 'Sujet', value: subject },
    { name: 'Mood', value: mood.toUpperCase() },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updatedEntry(entry.id, _value)
      console.log(updated)
      setAnalysis(updated.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <textarea
          className="w-full h-[calc(100%-6px)] p-8 text-xl outline-none resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div
          className="bg-blue-300 px-6 py-10 flex justify-between"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl">Analyse</h2>
          {isLoading && (
            <Badge variant="secondary" className="flex gap-2">
              <Spinner />
              Chargement
            </Badge>
          )}
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                key={item.name}
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
