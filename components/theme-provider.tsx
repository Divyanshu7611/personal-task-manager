'use client'

import * as React from 'react'
import { useState,useEffect } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if(!mounted) return <div className='opacity-0'>Loading...</div>
  return <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>
}
