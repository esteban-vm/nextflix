import { create } from 'zustand'

export type ManagementActionName = 'adding' | 'deleting'
export type ManagementActions = Record<ManagementActionName, boolean>
export type ManagementFunctionName = 'start' | 'end' | 'toggle'
export type ManagementFunctions = Record<ManagementFunctionName, (action: ManagementActionName) => void>
export type UseProfileManagement = ManagementActions & ManagementFunctions

export const useProfileManagement = create<UseProfileManagement>((set) => {
  return {
    adding: false,
    deleting: false,
    start(action) {
      set({ [action]: true })
    },
    end(action) {
      set({ [action]: false })
    },
    toggle(action) {
      set((state) => ({ [action]: !state[action] }))
    },
  }
})
