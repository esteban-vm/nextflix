import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect, useState } from 'react'
import { LuBellRing, LuSearch } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { LogoutButton, ManageButton, NavAvatar, NavIcon, NavItem } from '@/components/navigation/molecules'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useCurrentSession, useMobileNav, useProfileStore } from '@/hooks'

export function NavMenu() {
  const { push } = useRouter()
  const { close } = useMobileNav()
  const { session, status } = useCurrentSession()
  const [isOpen, setIsOpen] = useState(false)
  const { isCompleted, end } = useProfileStore()
  const { execute, result } = useAction(ProfileActions.findAll)

  const hasResults = !!result.data?.length
  const isAuthenticated = status === 'authenticated'
  const userEmail = session?.user.email ?? 'no email'

  const fetchProfiles = useCallback(() => {
    if (isAuthenticated) {
      if (isCompleted) end('isCompleted')
      execute()
    }
  }, [end, execute, isAuthenticated, isCompleted])

  useEffect(fetchProfiles, [fetchProfiles])

  const onRedirect = () => {
    close()
    setIsOpen(false)
    push('/profiles')
  }

  const onLogOut = () => {
    close()
    setIsOpen(false)
    signOut({ redirectTo: '/login' })
  }

  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>
      <NavIcon className='order-1' content='Búsqueda' icon={LuSearch} />
      <NavIcon className='order-3 lg:order-2' content='Notificaciones' icon={LuBellRing} />
      {isAuthenticated && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className='order-2 lg:order-3'>
            <NavAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='text-sm'>
            <DropdownMenuItem>{userEmail}</DropdownMenuItem>
            <DropdownMenuSeparator />
            {hasResults && (
              <>
                <DropdownMenuGroup>
                  {result.data!.map((profile) => (
                    <NavItem key={profile.id} profile={profile} />
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <ManageButton onClick={onRedirect} />
                <DropdownMenuSeparator />
              </>
            )}
            <LogoutButton onClick={onLogOut} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
