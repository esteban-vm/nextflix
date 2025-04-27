import { LuArrowLeftCircle, LuPopcorn } from 'react-icons/lu'
import tw from 'tailwind-styled-components'
import { Button } from '@/components/ui'

export const IconArrow = tw(LuArrowLeftCircle)`

  !size-full

  stroke-neutral-700

`

export const IconPopcorn = tw(LuPopcorn)`

  stroke-rose-600

  ~size-6/7

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

export const SideDown = tw.div`

  relative

  aspect-video

  overflow-hidden

  rounded-b-lg

  contrast-125

  hover:opacity-90

`

export const SideUp = tw.div`

  flex

  items-center

  gap-2

  p-1

`

export const StyledButton = tw(Button)`

  rounded-full

  ~size-7/8

`
