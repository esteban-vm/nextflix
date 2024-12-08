import type { Profile } from '@prisma/client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface UseCurrentProfile {
  profile: Profile | null
  change: (nextProfile: Profile) => void
}

export const useCurrentProfile = create(
  persist<UseCurrentProfile>(
    (set) => {
      return {
        profile: null,
        change(nextProfile) {
          set({ profile: nextProfile })
        },
      }
    },
    {
      name: 'current-profile',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
