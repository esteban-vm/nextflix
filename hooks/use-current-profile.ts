import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

type CurrentProfile = Utils.Nullable<Models.Profile>

interface CurrentProfileStore {
  currentProfile: CurrentProfile
  setCurrentProfile: (value: CurrentProfile) => void
}

export const useCurrentProfile = create<CurrentProfile>()(
  devtools(
    persist(
      (set) => {
        return {
          currentProfile: null,
          setCurrentProfile(value) {
            set({ currentProfile: value })
          },
        }
      },
      {
        name: 'current-profile-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize(state) {
          return { currentProfile: state.currentProfile }
        },
      }
    ),
    {
      name: 'current-profile',
    }
  )
)
