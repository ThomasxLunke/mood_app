import { DarkModeToggle } from '@/components/DarkModeToggle'
import { AppSidebar } from '@/components/Sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

// Theming (ThemeProvider) lives in the root app/layout.tsx now, so the
// landing page ("/") gets it too — this layout only adds the dashboard
// chrome (sidebar + header) on top of it. It must NOT render its own
// <html>/<body>: the App Router only allows the true root layout to do that.
export default function Layout(props: { children: ReactNode }) {
  const { children } = props
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-screen relative">
        <div className=" h-full">
          <header className="h-[60px] border-b flex justify-between items-center border-border px-6 w-full">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <UserButton />
            </div>
          </header>
          <div className="h-[calc(100vh-60px)]">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  )
}
