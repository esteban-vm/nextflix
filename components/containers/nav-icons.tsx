import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect } from 'react'
import { LuBellRing, LuLogOut, LuPencil, LuSearch, LuUser } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { NavItem } from '@/common'
import { useCurrentSession, useProfileStore } from '@/hooks'
import { avatarPaths } from '@/lib/constants'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui'

export function NavIcons({ onCloseMobile }: NavIconsProps) {
  const { push } = useRouter()
  const { status } = useCurrentSession()
  const { isCompleted, end, profile } = useProfileStore()
  const { execute, result } = useAction(ProfileActions.findAll)
  const isAuthenticated = status === 'authenticated'
  const hasResults = !!result.data?.length

  const fetchProfiles = useCallback(() => {
    if (isAuthenticated) {
      if (isCompleted) end('isCompleted')
      execute()
    }
  }, [end, execute, isAuthenticated, isCompleted])

  useEffect(fetchProfiles, [fetchProfiles])

  const onRedirect = () => {
    onCloseMobile?.()
    push('/profiles')
  }

  const onLogOut = () => {
    onCloseMobile?.()
    signOut({ redirectTo: '/login' })
  }

  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>
      <Tooltip>
        <TooltipTrigger className='order-1'>
          <LuSearch className='size-6 cursor-pointer' />
          <TooltipContent>Búsqueda</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className='order-3 lg:order-2'>
          <LuBellRing className='size-6 cursor-pointer' />
          <TooltipContent>Notificaciones</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger className='order-2 lg:order-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className='size-12 cursor-pointer border-2 border-primary'>
                  <AvatarImage alt={profile?.name} src={profile ? avatarPaths[profile.avatar] : undefined} />
                  <AvatarFallback>
                    <LuUser className='size-3/4' />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {profile?.name && <TooltipContent className='font-bold'>Perfil de {profile.name}</TooltipContent>}
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='text-sm'>
            {hasResults && (
              <>
                <DropdownMenuGroup>
                  {result.data!.map((profile) => (
                    <NavItem key={profile.id} {...profile} />
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='flex cursor-pointer justify-between' onClick={onRedirect}>
                  Administrar perfiles
                  <LuPencil className='size-6' />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem className='flex cursor-pointer justify-between' onClick={onLogOut}>
              Cerrar sesión
              <LuLogOut className='size-6' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export interface NavIconsProps {
  onCloseMobile?: () => void
}
