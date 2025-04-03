import { LuPlayCircle, LuPlusCircle, LuXCircle } from 'react-icons/lu'
import tw from 'tailwind-styled-components'
import { Button, Card, CardContent, CarouselItem } from '@/components/ui'

export const ButtonGroup = tw.div`

  flex

  gap-1

`

export const IconAdd = tw(LuPlusCircle)`

  !size-full

  stroke-sky-500

`

export const IconDelete = tw(LuXCircle)`

  !size-full

  stroke-pink-500

`

export const IconPlay = tw(LuPlayCircle)`

  !size-full

  stroke-rose-500

`

export const ItemCard = tw(Card)`

  mx-auto

  aspect-video

  max-w-md

  overflow-hidden

  border-4

  border-primary-foreground

`

export const ItemContainer = tw(CarouselItem)`

  pl-1

  md:basis-1/3

  xl:basis-1/5

`

export const ItemContent = tw(CardContent)`

  group

  relative

  size-full

`

export const MovieInfo = tw.div`

  absolute

  inset-x-0

  top-full

  -translate-y-full

  items-center

  justify-around

  gap-2

  bg-primary-foreground

  pt-1

  pointer-coarse:flex

  pointer-fine:hidden

  pointer-fine:animate-in

  pointer-fine:slide-in-from-bottom

  pointer-fine:group-hover:flex

`

export const MovieTitle = tw.span`

  grow

  truncate

  text-center

  font-semibold

  italic

`

export const StyledButton = tw(Button)`

  rounded-full

  ~size-8/9

`
