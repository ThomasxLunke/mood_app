import React from 'react'

export default function EntryCard(props: { entry: any }) {
  const { entry } = props
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{entry.analysis?.summary ?? ''}</div>
      <div
        className="px-4 py-4 sm:px-6"
        style={{ backgroundColor: entry.analysis?.color }}
      >
        {entry.analysis?.mood ?? ''}
      </div>
    </div>
  )
}
