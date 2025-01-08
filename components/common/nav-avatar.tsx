import { LuUser } from 'react-icons/lu'
import { avatars } from '@/lib/constants'
import { Avatar, AvatarImage, AvatarFallback, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@/ui'

export function NavAvatar({ className, profile }: NavAvatarProps) {
  return (
    <DropdownMenuTrigger className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className='size-12 cursor-pointer border-2 border-primary'>
            <AvatarImage alt={`Perfil de ${profile?.name}`} src={profile ? avatars[profile.avatar] : undefined} />
            <AvatarFallback>
              <LuUser className='size-3/4' />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        {profile && <TooltipContent className='font-bold'>Perfil de {profile.name}</TooltipContent>}
      </Tooltip>
    </DropdownMenuTrigger>
  )
}

export interface NavAvatarProps {
  className: string
  profile: Models.Profile | null
}
