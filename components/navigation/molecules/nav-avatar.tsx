import { LuUser } from 'react-icons/lu'
import { Avatar, AvatarImage, AvatarFallback, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { useProfileStore } from '@/hooks'
import { avatars } from '@/lib/constants'

export function NavAvatar() {
  const { currentProfile: profile } = useProfileStore()

  return (
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
  )
}
