// Static Tailwind classes via `elements`, not the `variables`/`baseTheme`
// color mechanism. Two reasons:
// 1. `variables` needs literal color values (Clerk's validator rejects
//    `var(--x)`), so reacting to light/dark would require React state on
//    <ClerkProvider> itself — which broke Next's SSR hydration for it
//    (Clerk's Next.js integration expects to be used directly from a
//    Server Component, not wrapped in an extra client component).
// 2. Plain Tailwind classes here need no reactivity at all: `dark:` variants
//    already follow the same `.dark` class on <html> that next-themes
//    toggles for the rest of the app, so this file can be fully static.
export const clerkAppearance = {
  elements: {
    card: 'bg-secondary border border-border shadow-lg',
    headerTitle: 'text-foreground',
    headerSubtitle: 'text-muted-foreground',
    socialButtonsBlockButton:
      'border border-border bg-background text-foreground hover:bg-accent',
    dividerLine: 'bg-border',
    dividerText: 'text-muted-foreground',
    formFieldLabel: 'text-foreground',
    formFieldInput: 'bg-background border border-border text-foreground',
    formButtonPrimary:
      'bg-primary text-primary-foreground hover:bg-primary/90',
    footerActionText: 'text-muted-foreground',
    footerActionLink: 'text-primary hover:text-primary/90',

    // <UserButton/>'s popover (avatar menu top-right) — separate surface
    // from the SignIn/SignUp card above, needs its own element keys or it
    // falls back to Clerk's unstyled default (dark, illegible text on our
    // dark card in dark mode).
    userButtonPopoverCard: 'bg-secondary border border-border shadow-lg',
    userButtonPopoverMain: 'bg-secondary',
    userButtonPopoverActions: 'bg-secondary',
    userButtonPopoverUserPreview: 'border-b border-border',
    userPreviewMainIdentifier: 'text-foreground',
    userPreviewSecondaryIdentifier: 'text-muted-foreground',
    userButtonPopoverActionButton: 'text-foreground hover:bg-accent',
    userButtonPopoverActionButtonText: 'text-foreground',
    userButtonPopoverActionButtonIcon: 'text-muted-foreground',
    userButtonPopoverFooter: 'bg-secondary border-t border-border',
    userButtonPopoverFooterPagesLink: 'text-muted-foreground hover:text-foreground',
  },
}
