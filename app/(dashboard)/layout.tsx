import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import React, { ReactNode } from 'react'

// Theming (ThemeProvider) lives in the root app/layout.tsx now, so the
// landing page ("/") gets it too — this layout only adds the dashboard
// chrome (header) on top of it. It must NOT render its own <html>/<body>:
// the App Router only allows the true root layout to do that.
export default function Layout(props: { children: ReactNode }) {
  const { children } = props
  return (
    <div className="flex h-screen w-full flex-col">
      <DashboardHeader />
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
