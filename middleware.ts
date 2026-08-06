import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  // Sign-in/up must be public too — nothing linked to them before (the old
  // landing page only ever sent logged-out visitors to /new-user), so this
  // was never hit: without it, the middleware 401s the sign-in page itself,
  // which is unreachable-by-definition without already being signed in.
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
