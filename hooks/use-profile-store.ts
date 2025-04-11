import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface CurrentProfileSlice {
  currentProfile: Utils.Nullable<Models.Profile>
  setCurrentProfile: (value: Utils.Nullable<Models.Profile>) => void
  refetchFavorites: boolean
  setRefetchFavorites: (value: boolean) => void
}

const currentProfileSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], CurrentProfileSlice> = (
  set
) => {
  return {
    currentProfile: null,
    setCurrentProfile(value) {
      set({ currentProfile: value }, undefined, 'current-profile-state:set')
    },
    refetchFavorites: false,
    setRefetchFavorites(value) {
      set({ refetchFavorites: value })
    },
  }
}

type ProfileUIState = `is${'Adding' | 'Deleting' | 'Completed'}`
type ProfileUIStates = Record<ProfileUIState, boolean>
type ProfileUIAction = 'start' | 'end' | 'toggle'
type ProfileUIActions = Record<ProfileUIAction, (value: ProfileUIState) => void>
type ProfileUISlice = ProfileUIStates & ProfileUIActions

const profileUISlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], ProfileUISlice> = (set) => {
  return {
    isAdding: false,
    isDeleting: false,
    isCompleted: false,
    start(value) {
      set({ [value]: true }, undefined, 'profile-management-state:start')
    },
    end(value) {
      set({ [value]: false }, undefined, 'profile-management-state:end')
    },
    toggle(value) {
      set((state) => ({ [value]: !state[value] }), undefined, 'profile-management-state:toggle')
    },
  }
}

type ProfileStore = CurrentProfileSlice & ProfileUISlice

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (...args) => {
        return {
          ...currentProfileSlice(...args),
          ...profileUISlice(...args),
        }
      },
      {
        name: 'current-profile-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ currentProfile: state.currentProfile }),
      }
    )
  )
)
