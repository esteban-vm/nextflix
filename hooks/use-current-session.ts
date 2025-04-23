import type { Session } from 'next-auth'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

export type CurrentSession = Utils.Nullable<Session>

interface CurrentSessionStore {
  currentSession: CurrentSession
  setCurrentSession: (value: CurrentSession) => void
}

export const useCurrentSession = create<CurrentSessionStore>()(
  devtools(
    persist(
      (set) => {
        return {
          currentSession: null,
          setCurrentSession(value) {
            set({ currentSession: value })
          },
        }
      },
      {
        name: 'current-session-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize(state) {
          return { currentSession: state.currentSession }
        },
      }
    ),
    { name: 'current-session/set-current-session' }
  )
)
