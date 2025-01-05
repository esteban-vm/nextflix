import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
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
  const { isFinished, endAction, currentProfile } = useProfileStore()
  const { execute, result } = useAction(ProfileActions.findAll)
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    if (isAuthenticated) execute()
  }, [execute, isAuthenticated])

  useEffect(() => {
    if (isFinished) {
      execute()
      endAction('isFinished')
    }
  }, [endAction, execute, isFinished])

  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>
      <LuSearch className='cursor-pointer ~size-5/6' title='Búsqueda' />
      <LuBellRing className='cursor-pointer ~size-5/6' title='Notificaciones' />

      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              className='cursor-pointer border-2 border-primary'
              title={currentProfile ? `Perfil de ${currentProfile.name}` : undefined}
            >
              <AvatarImage
                alt={currentProfile?.name}
                src={currentProfile ? avatarPaths[currentProfile.avatar] : undefined}
              />
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
