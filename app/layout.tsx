import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'


export const metadata: Metadata = {
  title: 'task master',
  description: 'Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>)
{
 
  return (
    <html lang="en">

      <body>
      <ThemeProvider>
       

        {children}
      
        
      </ThemeProvider>
        </body>
    </html>
  )
}
