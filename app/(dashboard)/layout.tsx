import { DarkModeToggle } from '@/components/DarkModeToggle'
import { AppSidebar } from '@/components/Sidebar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

export default function Layout(props: { children: ReactNode }) {
  const { children } = props
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="h-screen w-screen relative">
              <div className=" h-full">
                <header className="h-[60px] border-b flex justify-between items-center border-black/10 px-6 w-full">
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
        </ThemeProvider>
      </body>
    </html>
  )
}
