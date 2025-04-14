import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface CurrentProfile {
  currentProfile: Utils.Nullable<Models.Profile>
  setCurrentProfile: (value: Utils.Nullable<Models.Profile>) => void
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
