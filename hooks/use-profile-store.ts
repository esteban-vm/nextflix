import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface CurrentProfileSlice {
  currentProfile: Utils.Nullable<Models.Profile>
  setCurrentProfile: (value: Utils.Nullable<Models.Profile>) => void
}

const currentProfileSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], CurrentProfileSlice> = (
  set
) => {
  return {
    currentProfile: null,
    setCurrentProfile(value) {
      set({ currentProfile: value }, undefined, 'current-profile-state:set')
    },
  }
}

type ProfileManagementState = `is${'Adding' | 'Deleting' | 'Completed'}`
type ProfileManagementStates = Record<ProfileManagementState, boolean>
type ProfileManagementAction = 'start' | 'end' | 'toggle'
type ProfileManagementActions = Record<ProfileManagementAction, (value: ProfileManagementState) => void>
interface ProfileManagementSlice extends ProfileManagementStates, ProfileManagementActions {}

const profileManagementSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], ProfileManagementSlice> = (
  set
) => {
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

type ProfileStore = CurrentProfileSlice & ProfileManagementSlice

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (...args) => {
        return {
          ...currentProfileSlice(...args),
          ...profileManagementSlice(...args),
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
