import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </div>
  )
}
