import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
}
