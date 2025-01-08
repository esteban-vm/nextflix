import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect, useState } from 'react'
import { LuBellRing, LuLogOut, LuPencil, LuSearch } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { NavAvatar, NavIcon, NavItem } from '@/common'
import { useCurrentSession, useProfileStore } from '@/hooks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/ui'

export function NavOptions({ onCloseMobile }: NavOptionsProps) {
  const { push } = useRouter()
  const { status } = useCurrentSession()
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
    push('/profiles')
  }

  const onLogOut = () => {
    onCloseMobile?.()
    setIsOpen(false)
    signOut({ redirectTo: '/login' })
  }

  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>
      <NavIcon className='order-1' content='Búsqueda' icon={LuSearch} />
      <NavIcon className='order-3 lg:order-2' content='Notificaciones' icon={LuBellRing} />
      {isAuthenticated && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <NavAvatar className='order-2 lg:order-3' profile={profile} />
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

export interface NavOptionsProps {
  onCloseMobile?: () => void
}
