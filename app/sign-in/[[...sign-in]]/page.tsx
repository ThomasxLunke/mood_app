import { SignIn } from '@clerk/nextjs'
import { AuthShell } from '@/components/auth/AuthShell'

// Theming comes from ClerkProviderWithTheme at the root — nothing to
// compute here.
export default function SigninPage() {
  return (
    <AuthShell>
      <SignIn />
    </AuthShell>
  )
}
