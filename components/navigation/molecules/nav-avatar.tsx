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
import { useProfileStore } from '@/hooks'
import { avatars } from '@/lib/constants'

export function NavAvatar(props: Props.WithClassName) {
  const { currentProfile } = useProfileStore()

  return (
    <DropdownMenuTrigger {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className='size-10 cursor-pointer border-2 border-primary'>
            <AvatarImage
              alt={`Perfil de ${currentProfile?.name}`}
              src={currentProfile ? avatars[currentProfile.avatar] : undefined}
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
