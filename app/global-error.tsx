'use client'

import { useEffect } from 'react'
import { PiMaskSadFill } from 'react-icons/pi'
import { Button } from '@/components/ui'
import { geistSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang='es'>
      <body className={cn('dark relative min-h-screen w-full antialiased bg-background', geistSans.variable)}>
        <div className='w-full max-w-lg border-4 border-destructive/30 py-5 text-center centered'>
          <PiMaskSadFill className='inline fill-destructive/30 ~size-20/24' />
          <h2 className='font-geist-sans ~text-lg/xl'>¡Algo salió mal!</h2>
          <p className='italic'>{error.message}</p>
          <Button variant='outline' onClick={reset}>
            Intenta de nuevo
          </Button>
        </div>
      </body>
    </html>
  )
}
