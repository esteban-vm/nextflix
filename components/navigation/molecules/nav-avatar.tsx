import { getCldImageUrl } from 'next-cloudinary'
import { LuUser } from 'react-icons/lu'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useCurrentProfile } from '@/hooks'

export function NavAvatar({ className }: Props.WithClassName) {
  const { currentProfile } = useCurrentProfile()

  return (
    <DropdownMenuTrigger className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className='size-10 cursor-pointer border-2 border-primary'>
            <AvatarImage
              alt={currentProfile ? `Perfil de ${currentProfile.name}` : undefined}
              src={currentProfile ? getCldImageUrl({ src: currentProfile.avatarUrl }) : undefined}
            />
            <AvatarFallback>
              <LuUser className='size-3/4' />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        {currentProfile && <TooltipContent className='font-bold'>Perfil de {currentProfile.name}</TooltipContent>}
      </Tooltip>
    </DropdownMenuTrigger>
  )
}
