import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect, useState } from 'react'
import { LuBellRing, LuSearch } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { MenuWrapper } from '@/components/navigation/atoms'
import { LogoutButton, ManageButton, NavAvatar, NavIcon, ImageItem, InfoItem } from '@/components/navigation/molecules'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui'
import { useCurrentSession, useMobileNav, useProfileStore } from '@/hooks'

export function NavMenu() {
  const { push } = useRouter()
  const { close } = useMobileNav()
  const { status } = useCurrentSession()
  const [isOpen, setIsOpen] = useState(false)
  const { isCompleted, end } = useProfileStore()
  const { execute, result } = useAction(ProfileActions.findAll)

  const hasResults = !!result.data?.length
  const isAuthenticated = status === 'authenticated'

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
    <MenuWrapper>
      <NavIcon className='order-1' content='Búsqueda' icon={LuSearch} />
      <NavIcon className='order-3 lg:order-2' content='Notificaciones' icon={LuBellRing} />
      {isAuthenticated && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <NavAvatar className='order-2 lg:order-3' />
          <DropdownMenuContent className='text-sm'>
            <InfoItem />
            <DropdownMenuSeparator />
            {hasResults && (
              <>
                <DropdownMenuGroup>
                  {result.data!.map((profile) => (
                    <ImageItem key={profile.id} profile={profile} />
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
    </MenuWrapper>
  )
}
