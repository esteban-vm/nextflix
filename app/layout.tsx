import '@/styles/globals.css'
import type { Metadata } from 'next'
import { auth } from '@/auth'
import { Navigation } from '@/components/navigation'
import { Toaster, TooltipProvider } from '@/components/ui'
import { appName, authorName } from '@/lib/constants'
import { geistMono, geistSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  applicationName: appName,
  title: { default: `${appName} | Inicio`, template: `${appName} | %s` },
  description: 'Clon de Netflix creado con Create Next App',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Netflix Clone'],
  authors: { name: authorName, url: 'https://github.com/esteban-vm' },
  generator: 'Next.js',
  creator: authorName,
  publisher: authorName,
  referrer: 'origin-when-cross-origin',
}

export default async function RootLayout({ children }: Props.WithChildren) {
  const currentSession = await auth()

  return (
    <html lang='es'>
      <body
        className={cn(
          'dark relative h-screen min-h-[28rem] w-full antialiased bg-background',
          geistSans.variable,
          geistMono.variable
        )}
        suppressHydrationWarning
      >
        <TooltipProvider>
          <Navigation currentSession={currentSession} />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
