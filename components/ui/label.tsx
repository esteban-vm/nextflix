import type { VariantProps } from 'class-variance-authority'
import type { ElementRef, ComponentPropsWithoutRef } from 'react'
import { Root } from '@radix-ui/react-label'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

type LabelProps = ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>

export const Label = forwardRef<ElementRef<typeof Root>, LabelProps>(({ className, ...props }, ref) => {
  return <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
})

Label.displayName = Root.displayName
