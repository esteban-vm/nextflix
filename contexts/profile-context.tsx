import type { Profile } from '@prisma/client'
import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'
import { deleteProfile } from '@/lib/auth'

export const ProfileContext = createContext<ProfileContextImpl>(null!)

export interface ProfileContextImpl extends WithProfiles {
  isManagingProfiles: boolean
  onDeleteProfile: (...ids: Parameters<typeof deleteProfile>) => Promise<void>
  onToggleManaging: () => void
}

export interface ProfileContextProps extends WithProfiles {
  children: ReactNode
}

export function ProfileContextProvider({ profiles, ...rest }: ProfileContextProps) {
  const [isManagingProfiles, setIsManagingProfiles] = useState(false)

  const value = useMemo((): ProfileContextImpl => {
    return {
      profiles,
      isManagingProfiles,
      async onDeleteProfile(...ids) {
        await deleteProfile(...ids)
        setIsManagingProfiles(false)
      },
      onToggleManaging() {
        setIsManagingProfiles(!isManagingProfiles)
      },
    }
  }, [isManagingProfiles, profiles])

  return <ProfileContext.Provider value={value} {...rest} />
}

export interface WithProfiles {
  profiles: Profile[]
}
