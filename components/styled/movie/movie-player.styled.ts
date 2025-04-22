import { LuArrowLeftCircle } from 'react-icons/lu'
import { TbMovie } from 'react-icons/tb'
import tw from 'tailwind-styled-components'
import { Button } from '@/components/ui'

export const IconArrow = tw(LuArrowLeftCircle)`

  stroke-neutral-70

  !size-full

`

export const IconMovie = tw(TbMovie)`

  stroke-rose-600

  ~size-7/8

`

export const PlayerContainer = tw.div`

  mx-auto

  flex

  w-full

  max-w-5xl

  flex-col

  rounded-lg

  border-4

  border-neutral-900

`

export const SideLeft = tw.div`

  flex

  items-center

  gap-2

  p-1

`

export const SideRight = tw.div`

  aspect-video

  overflow-hidden

  rounded-b-lg

  contrast-125

  hover:opacity-90

`

export const StyledButton = tw(Button)`

  rounded-full

  ~size-7/8

`
