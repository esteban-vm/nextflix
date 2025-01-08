import type { IconType } from 'react-icons/lib'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui'

export function NavIcon({ className, content, icon: Icon }: NavIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger className={className}>
        <Icon className='size-6 cursor-pointer' />
        <TooltipContent>{content}</TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  )
}

export interface NavIconProps {
  className: string
  content: string
  icon: IconType
}
