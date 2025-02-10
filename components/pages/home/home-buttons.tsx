import { LuInfo, LuPlay } from 'react-icons/lu'
import { Button } from '@/components/ui'

export function ButtonWrapper({ children }: WithChildren) {
  return <div className='mt-5 flex flex-col gap-4 md:flex-row'>{children}</div>
}

export function InfoButton() {
  return (
    <Button variant='secondary'>
      <LuInfo />
      &nbsp;Más Información
    </Button>
  )
}

export function PlayButton() {
  return (
    <Button>
      <LuPlay className='fill-black' />
      &nbsp;Reproducir
    </Button>
  )
}
