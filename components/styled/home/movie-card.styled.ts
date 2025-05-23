import { LuChevronUpCircle, LuChevronDownCircle, LuPlayCircle } from 'react-icons/lu'
import tw from 'tailwind-styled-components'
import { Badge, Button } from '@/components/ui'

export const CardContainer = tw.article`

  group

  relative

  flex

  aspect-square

  w-full

  max-w-60

`

export const FlexContainer = tw.div<FlexContainerProps>`

  ${({ $isBetween }) => ($isBetween ? 'justify-between' : 'justify-start')}

  flex

  items-center

  gap-1

`

export interface FlexContainerProps {
  $isBetween?: boolean
}

export const IconDown = tw(LuChevronDownCircle)`

  !size-full

  stroke-primary/75

`

export const IconPlay = tw(LuPlayCircle)`

  !size-full

  stroke-rose-500

`

export const IconUp = tw(LuChevronUpCircle)`

  !size-full

  stroke-primary/75

`

export const MovieTitle = tw.span`

  w-3/5

  truncate

  text-sm

  font-semibold

  italic

`

export const PlayerContainer = tw.div`

  relative

  mb-1

  aspect-video

  overflow-hidden

  rounded-md

  contrast-125

`

export const SideLeft = tw.div`

  relative

  h-full

  w-1/3

`

export const SideRight = tw.div`

  relative

  grow

`

export const StyledBadge = tw(Badge)<StyledBadgeProps>`

  ${({ $isMiddle }) => ($isMiddle ? 'mx-1' : 'm-0')}

  text-xs

`

export interface StyledBadgeProps {
  $isMiddle?: boolean
}

export const StyledButton = tw(Button)`

  rounded-full

  ~size-7/8

`

export const VideoInfo = tw.div`

  invisible

  absolute

  inset-x-0

  top-1/2

  z-10

  -translate-y-1/2

  scale-0

  select-none

  rounded-md

  bg-primary-foreground

  p-1

  opacity-0

  transition-all

  delay-200

  duration-700

  group-hover:visible

  group-hover:scale-125

  group-hover:opacity-100

`
