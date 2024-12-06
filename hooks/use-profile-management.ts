import { create } from 'zustand'

export type ActionFunctionName = 'start' | 'end' | 'toggle'
export type ActionFunctions = Record<ActionFunctionName, (action: ActionName) => void>
export type ActionName = 'adding' | 'deleting'
export type Actions = Record<ActionName, boolean>
export type UseProfileManagement = Actions & ActionFunctions

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
