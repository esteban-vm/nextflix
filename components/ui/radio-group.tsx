import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const RadioGroup = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    return <Root className={cn('grid gap-2', className)} {...props} ref={ref} />
  }
)

RadioGroup.displayName = Root.displayName

const RadioGroupItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={cn(
          'aspect-square h-4 w-4 border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <Indicator className='flex items-center justify-center'>
          <CheckIcon className='size-3.5 fill-primary' />
        </Indicator>
      </Item>
    )
  }
)

RadioGroupItem.displayName = Item.displayName

export { RadioGroup, RadioGroupItem }
