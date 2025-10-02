'use client'

import { askQuestion } from '@/utils/api'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Spinner } from './ui/spinner'

export default function Question() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    console.log(answer)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 rounded-xl p-4 border bg-card text-card-foreground shadow">
        <div className="flex gap-3">
          <Input
            disabled={loading}
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Posez une question au journal entier..."
          />
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : <Search />}
          </Button>
        </div>
        {response && (
          <div className="rounded-xl p-4 border bg-card text-card-foreground shadow">
            {response}
          </div>
        )}
      </div>
    </form>
  )
}
