import type { ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import {
  Root,
  Trigger,
  Group,
  Portal,
  Sub,
  RadioGroup,
  SubTrigger,
  SubContent,
  Content,
  Item,
  CheckboxItem,
  ItemIndicator,
  RadioItem,
  Label,
  Separator,
} from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const DropdownMenu = Root
const DropdownMenuTrigger = Trigger
const DropdownMenuGroup = Group
const DropdownMenuPortal = Portal
const DropdownMenuSub = Sub
const DropdownMenuRadioGroup = RadioGroup

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  return (
    <SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </SubTrigger>
  )
})

DropdownMenuSubTrigger.displayName = SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<ElementRef<typeof SubContent>, ComponentPropsWithoutRef<typeof SubContent>>(
  ({ className, ...props }, ref) => {
    return (
      <SubContent
        ref={ref}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    )
  }
)

DropdownMenuSubContent.displayName = SubContent.displayName

const DropdownMenuContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => {
    return (
      <Portal>
        <Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        />
      </Portal>
    )
  }
)

DropdownMenuContent.displayName = Content.displayName

const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
})

DropdownMenuItem.displayName = Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  return (
    <CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <ItemIndicator>
          <CheckIcon className='size-4' />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
})

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<ElementRef<typeof RadioItem>, ComponentPropsWithoutRef<typeof RadioItem>>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadioItem
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        {...props}
      >
        <span className='absolute left-2 flex size-3.5 items-center justify-center'>
          <ItemIndicator>
            <DotFilledIcon className='size-2 fill-current' />
          </ItemIndicator>
        </span>
        {children}
      </RadioItem>
    )
  }
)

DropdownMenuRadioItem.displayName = RadioItem.displayName

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  return <Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />
})

DropdownMenuLabel.displayName = Label.displayName

const DropdownMenuSeparator = forwardRef<ElementRef<typeof Separator>, ComponentPropsWithoutRef<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return <Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  }
)

DropdownMenuSeparator.displayName = Separator.displayName

function DropdownMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
