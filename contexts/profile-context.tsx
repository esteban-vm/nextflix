import type { Profile } from '@prisma/client'
import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'

export const ProfileContext = createContext<ProfileContextImpl>(null!)

export interface ProfileContextImpl extends WithProfiles {
  isAdding: boolean
  isDeleting: boolean
  setIsAdding: (value: boolean) => void
  setIsDeleting: (value: boolean) => void
}

export interface ProfileContextProps extends WithProfiles {
  children: ReactNode
}

export function ProfileContextProvider({ profiles, ...rest }: ProfileContextProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const value = useMemo((): ProfileContextImpl => {
    return {
      profiles,
      isAdding,
      isDeleting,
      setIsAdding,
      setIsDeleting,
    }
  }, [isAdding, isDeleting, profiles])

  return <ProfileContext.Provider value={value} {...rest} />
}

export interface WithProfiles {
  profiles: Profile[]
}
