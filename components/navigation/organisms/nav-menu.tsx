import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect, useState } from 'react'
import { LuBellRing, LuSearch } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { MenuWrapper } from '@/components/navigation/atoms'
import { LogoutButton, ManageButton, NavAvatar, NavIcon, ImageItem, InfoItem } from '@/components/navigation/molecules'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui'
import { useCurrentProfile, useCurrentSession, useUIStore } from '@/hooks'

export function NavMenu() {
  const { push } = useRouter()
  const { setCurrentProfile } = useCurrentProfile()
  const { currentSession, setCurrentSession } = useCurrentSession()
  const [isOpen, setIsOpen] = useState(false)
  const { execute, result } = useAction(ProfileActions.findAll)
  const { shouldRenderProfiles, setShouldRenderProfiles, setIsMobileNavigationOpen } = useUIStore()
  const profiles = result?.data

  const fetchProfiles = useCallback(() => {
    if (currentSession) {
      if (shouldRenderProfiles) {
        setShouldRenderProfiles(false)
      }

      execute()
    }
  }, [execute, currentSession, setShouldRenderProfiles, shouldRenderProfiles])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const onRedirect = useCallback(() => {
    setIsOpen(false)
    setIsMobileNavigationOpen(false)
    push('/profiles')
  }, [push, setIsMobileNavigationOpen])

  const onLogOut = useCallback(async () => {
    setIsOpen(false)
    setIsMobileNavigationOpen(false)
    await signOut({ redirectTo: '/login' })
    setCurrentProfile(null)
    setCurrentSession(null)
  }, [setCurrentProfile, setCurrentSession, setIsMobileNavigationOpen])

  return (
    <MenuWrapper>
      <NavIcon className='order-1' content='Búsqueda' icon={LuSearch} />
      <NavIcon className='order-3 lg:order-2' content='Notificaciones' icon={LuBellRing} />
      {currentSession && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <NavAvatar className='order-2 lg:order-3' />
          <DropdownMenuContent className='text-sm'>
            <InfoItem />
            <DropdownMenuSeparator />
            {profiles && profiles.length > 0 && (
              <>
                <DropdownMenuGroup>
                  {profiles.map((profile) => (
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
