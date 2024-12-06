import type { Profile } from '@prisma/client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface UseCurrentProfile {
  profile: Profile | null
  changeProfile: (data: Profile) => void
}

export const useCurrentProfile = create(
  persist<UseCurrentProfile>(
    (set) => {
      return {
        profile: null,
        changeProfile(profile) {
          set({ profile })
        },
      }
    },
    {
      name: 'current-profile',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
