'use client'

import { askQuestion } from '@/utils/api'
import React, { useState } from 'react'

export default function Question() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    console.log(answer)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          value={value}
          type="text"
          placeholder="Ask a question"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {loading && <div>...Loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}
