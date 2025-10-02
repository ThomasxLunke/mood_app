import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'

export default function page() {
  const { userId } = auth()
  const href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[800px] mx-auto">
        <h1 className="text-6xl">
          La meilleure application de journal, assistée par l&apos;IA.
        </h1>
        <p className="text-2xl text-white/60 mb-4">
          C&apos;est la meilleure application pour suivre votre humeur tout au
          long de votre vie. Tout ce que vous avez à faire, c&apos;est
          d&apos;être honnête.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              Se lancer
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
