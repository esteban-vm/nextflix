import { TbMovieOff } from 'react-icons/tb'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui'

export function MovieAlert({ children }: Props.WithChildren) {
  return (
    <Alert className='left-1/2 max-w-lg -translate-x-1/2 border-4'>
      <AlertTitle className='~text-lg/xl'>
        <TbMovieOff className='inline stroke-destructive align-text-bottom ~size-5/6' /> Lista vacía
      </AlertTitle>
      <AlertDescription className='italic'>{children}</AlertDescription>
    </Alert>
  )
}
