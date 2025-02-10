/* eslint-disable react/function-component-definition */

import type { ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Action,
  Cancel,
} from '@radix-ui/react-alert-dialog'
import { forwardRef } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const AlertDialog = Root
const AlertDialogTrigger = Trigger
const AlertDialogPortal = Portal

const AlertDialogOverlay = forwardRef<ElementRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(
  ({ className, ...props }, ref) => {
    return (
      <Overlay
        className={cn(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
        ref={ref}
      />
    )
  }
)

AlertDialogOverlay.displayName = Overlay.displayName

const AlertDialogContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <Content
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            className
          )}
          {...props}
        />
      </AlertDialogPortal>
    )
  }
)

AlertDialogContent.displayName = Content.displayName

const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
}

AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => {
    return <Title ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
  }
)

AlertDialogTitle.displayName = Title.displayName

const AlertDialogDescription = forwardRef<ElementRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(
  ({ className, ...props }, ref) => {
    return <Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  }
)

AlertDialogDescription.displayName = Description.displayName

const AlertDialogAction = forwardRef<ElementRef<typeof Action>, ComponentPropsWithoutRef<typeof Action>>(
  ({ className, ...props }, ref) => {
    return <Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
  }
)

AlertDialogAction.displayName = Action.displayName

const AlertDialogCancel = forwardRef<ElementRef<typeof Cancel>, ComponentPropsWithoutRef<typeof Cancel>>(
  ({ className, ...props }, ref) => {
    return (
      <Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} {...props} />
    )
  }
)

AlertDialogCancel.displayName = Cancel.displayName

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
