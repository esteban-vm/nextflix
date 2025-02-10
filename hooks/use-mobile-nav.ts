import { create } from 'zustand'

interface MobileNavState {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  close: () => void
}

export const useMobileNav = create<MobileNavState>()((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  close: () => set({ isOpen: false }),
}))
