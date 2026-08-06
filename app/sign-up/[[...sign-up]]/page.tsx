import { SignUp } from '@clerk/nextjs'
import { AuthShell } from '@/components/auth/AuthShell'

// Theming comes from ClerkProviderWithTheme at the root — nothing to
// compute here.
export default function SignupPage() {
  return (
    <AuthShell>
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </AuthShell>
  )
}
