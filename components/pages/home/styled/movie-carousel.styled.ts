import { LuPlayCircle, LuPlusCircle, LuXCircle } from 'react-icons/lu'
import tw from 'tailwind-styled-components'
import { Button, Card, CardContent, Carousel, CarouselContent, CarouselItem } from '@/components/ui'

export const ButtonGroup = tw.div`

  absolute

  inset-x-0

  top-full

  -translate-y-full

  items-center

  gap-1

  bg-background/80

  px-2

  py-1

  pointer-coarse:flex

  pointer-fine:hidden

  pointer-fine:animate-in

  pointer-fine:slide-in-from-bottom

  pointer-fine:group-hover:flex

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

export const StyledButton = tw(Button)`

  rounded-full

  ~size-8/9

`

export const StyledCard = tw(Card)`

  mx-auto

  aspect-video

  w-full

  max-w-sm

  overflow-hidden

  border-2

  border-secondary-foreground/50

  transition-transform

  pointer-fine:hover:scale-105

`

export const StyledCardContent = tw(CardContent)`

  group

  relative

  size-full

`

export const StyledCarousel = tw(Carousel)`

  mx-auto

  w-[95%]

`

export const StyledCarouselContent = tw(CarouselContent)`

  p-4

  active:cursor-grabbing

`

export const StyledCarouselItem = tw(CarouselItem)`

  md:basis-1/3

  lg:basis-1/5

`
