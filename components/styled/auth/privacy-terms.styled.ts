import { BsQuestionCircle } from 'react-icons/bs'
import tw from 'tailwind-styled-components'
import { TooltipContent } from '@/components/ui'

export const IconQuestion = tw(BsQuestionCircle)`

  inline

  cursor-help

  fill-primary/50

`

export const PrivacyContent = tw(TooltipContent)`

  max-w-sm

  text-pretty

  bg-background

  text-sm

  italic

  leading-tight

  text-primary/50

  ~p-4/6

`
