import { LuPlusCircle } from 'react-icons/lu'
import tw from 'tailwind-styled-components'
import { DialogTrigger } from '@/components/ui'

export const IconCircle = tw(LuPlusCircle)`

  size-5/6

  stroke-gray-500

`

export const IconContainer = tw.div`

  flex

  size-3/4

  items-center

  justify-center

`

export const RemainingText = tw.small`

  font-semibold

  text-gray-500

`

export const StyledTrigger = tw(DialogTrigger)`

  flex

  flex-col

  items-center

  justify-center

  transition-all

  ~size-28/32

  active:scale-95

  hover:opacity-90

`

export const TriggerText = tw.span`

  font-semibold

  uppercase

  text-gray-500

`
