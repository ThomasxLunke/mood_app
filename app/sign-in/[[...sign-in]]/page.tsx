import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  )
}
