"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { SunMoon } from 'lucide-react'

export default function ThemeSwitcher() {
    const {theme, setTheme} = useTheme()
  return (
  //  <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className='rounded-full'>
    <SunMoon className="h-6 w-6 rounded-full ml-2" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}/>
  //  </Button>
  )
}
