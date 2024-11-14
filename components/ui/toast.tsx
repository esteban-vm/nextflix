'use client'

import type { VariantProps } from 'class-variance-authority'
import type { ElementRef, ComponentPropsWithoutRef, ReactElement } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Provider, Viewport, Root, Action, Close, Title, Description } from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const ToastProvider = Provider

const ToastViewport = forwardRef<ElementRef<typeof Viewport>, ComponentPropsWithoutRef<typeof Viewport>>(
  ({ className, ...props }, ref) => {
    return (
      <Viewport
        ref={ref}
        className={cn(
          'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
          className
        )}
        {...props}
      />
    )
  }
)

ToastViewport.displayName = Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})

Toast.displayName = Root.displayName

const ToastAction = forwardRef<ElementRef<typeof Action>, ComponentPropsWithoutRef<typeof Action>>(
  ({ className, ...props }, ref) => {
    return (
      <Action
        ref={ref}
        className={cn(
          'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
          className
        )}
        {...props}
      />
    )
  }
)

ToastAction.displayName = Action.displayName

const ToastClose = forwardRef<ElementRef<typeof Close>, ComponentPropsWithoutRef<typeof Close>>(
  ({ className, ...props }, ref) => {
    return (
      <Close
        ref={ref}
        toast-close=''
        className={cn(
          'absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
          className
        )}
        {...props}
      >
        <Cross2Icon className='size-4' />
      </Close>
    )
  }
)

ToastClose.displayName = Close.displayName

const ToastTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => {
    return <Title ref={ref} className={cn('text-sm font-semibold [&+div]:text-xs', className)} {...props} />
  }
)

ToastTitle.displayName = Title.displayName

const ToastDescription = forwardRef<ElementRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(
  ({ className, ...props }, ref) => {
    return <Description ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
  }
)

ToastDescription.displayName = Description.displayName

type ToastProps = ComponentPropsWithoutRef<typeof Toast>
type ToastActionElement = ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}