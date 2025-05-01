import { LuArrowLeft, LuRotateCw } from 'react-icons/lu'
import tw from 'tailwind-styled-components'

export const ButtonContainer = tw.div`

  mb-2

  px-4

`

export const IconArrow = tw(LuArrowLeft)`

  !size-full

  stroke-neutral-700

`

export const IconReload = tw(LuRotateCw)`

  !size-full

  stroke-neutral-700

`

export const MainContainer = tw.div`

  mx-auto

  flex

  w-full

  max-w-5xl

  flex-col

`

export const PlayerContainer = tw.div`

  relative

  aspect-video

  overflow-hidden

  rounded-lg

  border-4

  border-neutral-900

`

export const TooltipContent = tw.span`

  font-semibold

  text-primary

  ~text-xs/sm

`
