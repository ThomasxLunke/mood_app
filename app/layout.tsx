import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { frFR } from '@clerk/localizations'
import { ThemeProvider } from '@/components/ThemeProvider'
import { clerkAppearance } from '@/components/auth/clerkAppearance'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Mood-AI — Journal intelligent propulsé par l'IA",
  description:
    "Journal intelligent qui analyse chaque entrée grâce à l'IA : résumé, note et couleur d'humeur générés automatiquement. Visualisez vos tendances émotionnelles et interrogez votre journal par IA.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // ClerkProvider used directly here (Server Component), not wrapped in
    // a client component — wrapping it broke Next's SSR hydration for its
    // children (see clerkAppearance.ts for why theming doesn't need that
    // wrapper anyway).
    <ClerkProvider localization={frFR} appearance={clerkAppearance}>
      <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
