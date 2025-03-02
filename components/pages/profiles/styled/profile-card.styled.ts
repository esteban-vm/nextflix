import Image from 'next/image'
import tw from 'tailwind-styled-components'

export const AvatarImage = tw(Image)<AvatarImageProps>`

  ${({ $isBlur }) => ($isBlur ? 'blur-md' : 'group-hover:border-gray-500')}

  rounded-md

  border-2

  border-transparent

  bg-cover

`

export interface AvatarImageProps {
  $isBlur: boolean
}

export const CardContainer = tw.article`

  group

  flex

  cursor-pointer

  select-none

  flex-col

  items-center

  justify-center

  gap-2

  transition-all

  ~size-28/32

`

export const CardContent = tw.div`

  relative

  size-3/4

`

export const DialogContainer = tw.div<DialogContainerProps>`

  ${({ $isHidden }) => $isHidden && 'hidden'}

  absolute

  left-1/2

  top-1/2

  -translate-x-1/2

  -translate-y-1/2

`

export interface DialogContainerProps {
  $isHidden: boolean
}

export const ProfileName = tw.span`

  max-w-full

  truncate

  font-semibold

  uppercase

  text-gray-500

  group-hover:opacity-90

`
