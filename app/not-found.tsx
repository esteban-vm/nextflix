import Link from 'next/link'
import { PiMaskSadDuotone } from 'react-icons/pi'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className='absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border-4 border-primary/30 py-5 text-center'>
      <PiMaskSadDuotone className='inline fill-destructive ~size-20/24' />
      <h2>Página no encontrada</h2>
      <Button className='animate-pulse' variant='link' asChild>
        <Link href='/'>
          <span>Volver a Inicio</span>
        </Link>
      </Button>
    </div>
  )
}
