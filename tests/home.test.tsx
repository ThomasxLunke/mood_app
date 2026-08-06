import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

// Simulates a signed-in visitor: SignedIn renders its children, SignedOut
// renders nothing. UserButton/SignInButton are Clerk's own client
// components — stub them so the test doesn't need a real ClerkProvider.
vi.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: () => null,
  UserButton: () => <div data-testid="user-button" />,
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

test('Home', () => {
  render(<Page />)

  expect(
    screen.getByText("Un journal intime, éclairé par l'IA.")
  ).toBeTruthy()

  // Signed-in visitors get a direct link back into the app instead of a
  // sign-in prompt.
  expect(screen.getByText('Retrouver mon journal')).toBeTruthy()
  expect(screen.getAllByTestId('user-button').length).toBeGreaterThan(0)
})
