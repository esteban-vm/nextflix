import type { Metadata } from 'next'
import Link from 'next/link'
import { PiMaskSadDuotone } from 'react-icons/pi'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <div className='w-full max-w-lg border-4 border-primary/30 py-5 text-center centered'>
      <PiMaskSadDuotone className='inline fill-destructive ~size-20/24' />
      <h2 className='~text-lg/xl'>Página no encontrada</h2>
      <Button className='motion-safe:animate-pulse' variant='link' asChild>
        <Link href='/'>
          <span>Volver a Inicio</span>
        </Link>
      </Button>
    </div>
  )
}
