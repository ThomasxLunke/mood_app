import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button, type ButtonProps } from '@/components/ui/button'

type AuthCtaProps = {
  /** Label shown to signed-out visitors, opens Clerk's sign-in flow. */
  signedOutLabel: string
  /**
   * Label shown to signed-in visitors as a link to their journal.
   * Omit to show the Clerk account avatar instead (header usage).
   */
  signedInLabel?: string
  signedInHref?: string
  buttonProps?: ButtonProps
}

// Server Component: SignedIn/SignedOut check auth server-side, UserButton
// and SignInButton are Clerk's own client components rendered as children —
// no 'use client' needed here, matching how app/(dashboard)/layout.tsx
// already renders <UserButton /> directly.
export function AuthCta({
  signedOutLabel,
  signedInLabel,
  signedInHref = '/journal',
  buttonProps,
}: AuthCtaProps) {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button {...buttonProps}>{signedOutLabel}</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {signedInLabel ? (
          <Button {...buttonProps} asChild>
            <Link href={signedInHref}>{signedInLabel}</Link>
          </Button>
        ) : (
          <UserButton />
        )}
      </SignedIn>
    </>
  )
}
