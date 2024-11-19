import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder = '…', type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:select-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export type InputProps = InputHTMLAttributes<HTMLInputElement>
