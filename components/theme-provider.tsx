'use client'

import * as React from 'react'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { useState,useEffect } from 'react'
import { Toaster } from 'sonner'
// import { SessionProvider } from 'next-auth/react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [queryClient] = useState(() => new QueryClient());

  if(!mounted) return <div className='opacity-0'>Loading...</div>
  return (
    // <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>
    </QueryClientProvider>
    // </SessionProvider>
  )
}
