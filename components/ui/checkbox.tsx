import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import { Root, Indicator } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Checkbox = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      checked='indeterminate'
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      {...props}
    >
      <Indicator className='flex items-center justify-center text-current'>
        <CheckIcon />
      </Indicator>
    </Root>
  )
)

Checkbox.displayName = Root.displayName
