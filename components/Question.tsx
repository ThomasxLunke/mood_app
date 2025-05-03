'use client'

import React, { useState } from 'react'

export default function Question() {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          value={value}
          type="text"
          placeholder="Ask a question"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}
