import '@/globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Netflix Clone generated by create next app',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Netflix Clone'],
  authors: { name: 'Esteban V.M.', url: 'https://github.com/esteban-vm' },
  generator: 'Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})
