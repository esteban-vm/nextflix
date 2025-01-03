import type { Profile } from '@prisma/client'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ProfileListSlice {
  profileList: Profile[]
  setProfileList: (value: Profile[]) => void
}

const profileListSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], ProfileListSlice> = (set) => {
  return {
    profileList: [],
    setProfileList(value) {
      set({ profileList: value }, undefined, 'Profile List, set')
    },
  }
}

interface CurrentProfileSlice {
  currentProfile: Profile | null
  setCurrentProfile: (value: Profile | null) => void
}

const currentProfileSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], CurrentProfileSlice> = (
  set
) => {
  return {
    currentProfile: null,
    setCurrentProfile(value) {
      set({ currentProfile: value }, undefined, 'Current Profile, set')
    },
  }
}

type ProfileManagementState = `is${'Adding' | 'Deleting'}`
type ProfileManagementStates = Record<ProfileManagementState, boolean>
type ProfileManagementAction = `${'start' | 'end' | 'toggle'}Action`
type ProfileManagementActions = Record<ProfileManagementAction, (value: ProfileManagementState) => void>
interface ProfileManagementSlice extends ProfileManagementStates, ProfileManagementActions {}

const profileManagementSlice: StateCreator<ProfileStore, [['zustand/devtools', never]], [], ProfileManagementSlice> = (
  set
) => {
  return {
    isAdding: false,
    isDeleting: false,
    startAction(value) {
      set({ [value]: true }, undefined, `Profile Management, start: ${value}`)
    },
    endAction(value) {
      set({ [value]: false }, undefined, `Profile Management, end: ${value}`)
    },
    toggleAction(value) {
      set((state) => ({ [value]: !state[value] }), undefined, `Profile Management, toggle: ${value}`)
    },
  }
}

type ProfileStore = ProfileListSlice & CurrentProfileSlice & ProfileManagementSlice

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (...args) => {
        return {
          ...profileListSlice(...args),
          ...currentProfileSlice(...args),
          ...profileManagementSlice(...args),
        }
      },
      {
        name: 'Current Profile',
        partialize: (state) => state.currentProfile,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
