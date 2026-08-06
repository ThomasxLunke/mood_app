import { LandingHeader } from '@/components/landing/LandingHeader'
import { AuthCta } from '@/components/landing/AuthCta'
import { PageBackground } from '@/components/landing/PageBackground'
import { HeroSection } from '@/components/landing/HeroSection'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { PourquoiSection } from '@/components/landing/PourquoiSection'
import { CommentSection } from '@/components/landing/CommentSection'
import { ResultatSection } from '@/components/landing/ResultatSection'
import { TechStackBadges } from '@/components/landing/TechStackBadges'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <PageBackground />

      <LandingHeader authSlot={<AuthCta signedOutLabel="Se connecter" />} />

      <HeroSection
        authSlot={
          <AuthCta
            signedOutLabel="Se lancer gratuitement"
            signedInLabel="Retrouver mon journal"
            buttonProps={{ size: 'lg' }}
          />
        }
      />

      <ScrollReveal>
        <PourquoiSection />
      </ScrollReveal>

      <ScrollReveal>
        <CommentSection />
      </ScrollReveal>

      <ScrollReveal>
        <ResultatSection />
      </ScrollReveal>

      <ScrollReveal>
        <TechStackBadges />
      </ScrollReveal>

      <LandingFooter />
    </div>
  )
}
