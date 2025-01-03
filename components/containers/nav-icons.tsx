import { signOut } from 'next-auth/react'
import { LuBellRing, LuSearch, LuUser } from 'react-icons/lu'
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
  const { profileList, currentProfile } = useProfileStore()
  const { status } = useCurrentSession()
  const isAuthenticated = status === 'authenticated'

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
              {profileList.map(({ id, name }) => (
                <DropdownMenuItem key={id} className='cursor-pointer'>
                  {name}
                </DropdownMenuItem>
              ))}
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
