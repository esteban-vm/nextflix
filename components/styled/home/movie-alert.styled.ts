import { TbMovieOff } from 'react-icons/tb'
import tw from 'tailwind-styled-components'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui'

export const Description = tw(AlertDescription)`

  italic

`

export const IconMovie = tw(TbMovieOff)`

  inline

  stroke-destructive

  align-text-bottom

  ~size-5/6

`

export const StyledAlert = tw(Alert)`

  left-1/2

  max-w-lg

  -translate-x-1/2

  border-4

`

export const Title = tw(AlertTitle)`

  ~text-lg/xl

`
