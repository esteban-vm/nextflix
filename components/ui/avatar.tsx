import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import { Root, Image, Fallback } from '@radix-ui/react-avatar'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Avatar = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    return (
      <Root
        ref={ref}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
      />
    )
  }
)

Avatar.displayName = Root.displayName

const AvatarImage = forwardRef<ElementRef<typeof Image>, ComponentPropsWithoutRef<typeof Image>>(
  ({ className, ...props }, ref) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
  }
)

AvatarImage.displayName = Image.displayName

const AvatarFallback = forwardRef<ElementRef<typeof Fallback>, ComponentPropsWithoutRef<typeof Fallback>>(
  ({ className, ...props }, ref) => {
    return (
      <Fallback
        ref={ref}
        className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
        {...props}
      />
    )
  }
)

AvatarFallback.displayName = Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
