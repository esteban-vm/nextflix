import type { IconType } from 'react-icons/lib'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui'

export function NavIcon({ content, icon: Icon, ...rest }: NavIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger {...rest}>
        <Icon className='size-6 cursor-pointer' />
        <TooltipContent>{content}</TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  )
}

export interface NavIconProps extends Props.WithClassName {
  content: string
  icon: IconType
}
