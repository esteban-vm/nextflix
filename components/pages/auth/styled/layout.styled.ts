import Link from 'next/link'
import tw from 'tailwind-styled-components'

export const AuthLink = tw(Link)`

  font-semibold

  text-rose-700

  hover:underline

  hover:opacity-90

`

export const CheckboxContainer = tw.span`

  flex

  w-fit

  items-center

  justify-center

  hover:opacity-90

`

export const CheckboxLabel = tw.label`

  cursor-pointer

  select-none

  leading-none

  peer-disabled:cursor-not-allowed

  peer-disabled:opacity-70

`

export const FlexContainer = tw.div<FlexContainerProps>`

  ${({ $isCol }) => ($isCol ? 'flex-col' : 'flex-row')}

  flex

  w-full

  items-center

  justify-between

`

export interface FlexContainerProps {
  $isCol?: boolean
}

export const LayoutContainer = tw.div`

  relative

  flex

  size-full

  items-center

  justify-center

`

export const PageContainer = tw.section`

  z-20

  flex

  max-w-[95%]

  flex-col

  justify-center

  rounded-xl

  bg-background/80

  ~gap-1/2

  ~px-5/9

  ~py-6/10

  sm:max-w-lg

`

export const PageTitle = tw.h2`

  font-semibold

  ~text-xl/2xl

`

export const PasswordLink = tw(Link)`

  font-semibold

  text-sky-700

  hover:underline

  hover:opacity-90

`

export const TermsContainer = tw.p`

  text-center

  text-sm

  leading-tight

  text-primary/50

`
