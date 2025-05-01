import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'

export default function page() {
  const { userId } = auth()
  const href = userId ? '/journal' : '/new-u ser'
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl">The best Journal app, period.</h1>
        <p className="text-2xl text-white/60 mb-4">
          This is the best app for tracking yout mood through out yout life. All
          you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
