import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect } from 'react'
import { LuBellRing, LuSearch, LuUser } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui'

export function NavIcons() {
  const { status } = useCurrentSession()
  const { isCompleted, end, profile } = useProfileStore()
  const { execute, result } = useAction(ProfileActions.findAll)
  const isAuthenticated = status === 'authenticated'

  const fetchProfiles = useCallback(() => {
    if (isAuthenticated) {
      if (isCompleted) end('isCompleted')
      execute()
    }
  }, [end, execute, isAuthenticated, isCompleted])

  useEffect(fetchProfiles, [fetchProfiles])

  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>
      <LuSearch className='cursor-pointer ~size-5/6' title='Búsqueda' />
      <LuBellRing className='cursor-pointer ~size-5/6' title='Notificaciones' />
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              className='cursor-pointer border-2 border-primary'
              title={profile ? `Perfil de ${profile.name}` : undefined}
            >
              <AvatarImage alt={profile?.name} src={profile ? avatarPaths[profile.avatar] : undefined} />
              <AvatarFallback>
                <LuUser className='size-3/4' />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Mis Perfiles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {result.data?.map(({ id, name }) => {
                return (
                  <DropdownMenuItem key={id} className='cursor-pointer'>
                    {name}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' onClick={() => signOut({ redirectTo: '/login' })}>
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
