import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MobileNavigationUISlice {
  isMobileNavigationOpen: boolean
  setIsMobileNavigationOpen: (value: boolean) => void
}

const mobileNavigationUISlice: UISlice<MobileNavigationUISlice> = (set) => {
  return {
    isMobileNavigationOpen: false,
    setIsMobileNavigationOpen(value) {
      set({ isMobileNavigationOpen: value })
    },
  }
}

interface MovieCarouselUISlice {
  shouldScrollCarouselIntoView: boolean
  setShouldScrollCarouselIntoView: (value: boolean) => void
  shouldRenderFavoriteMovies: boolean
  setShouldRenderFavoriteMovies: (value: boolean) => void
}

const movieCarouselUISlice: UISlice<MovieCarouselUISlice> = (set) => {
  return {
    shouldScrollCarouselIntoView: false,
    setShouldScrollCarouselIntoView(value) {
      set({ shouldScrollCarouselIntoView: value })
    },
    shouldRenderFavoriteMovies: false,
    setShouldRenderFavoriteMovies(value) {
      set({ shouldRenderFavoriteMovies: value })
    },
  }
}

interface ProfilesUISlice {
  isDeleteProfileAlertHidden: boolean
  setIsDeleteProfileAlertHidden: (value: boolean) => void
  shouldRenderProfiles: boolean
  setShouldRenderProfiles: (value: boolean) => void
}

const profilesUISlice: UISlice<ProfilesUISlice> = (set) => {
  return {
    isDeleteProfileAlertHidden: true,
    setIsDeleteProfileAlertHidden(value) {
      set({ isDeleteProfileAlertHidden: value })
    },
    shouldRenderProfiles: false,
    setShouldRenderProfiles(value) {
      set({ shouldRenderProfiles: value })
    },
  }
}

type UIStore = MobileNavigationUISlice & MovieCarouselUISlice & ProfilesUISlice
type UISlice<T> = StateCreator<UIStore, [['zustand/devtools', never]], [], T>

export const useUIStore = create<UIStore>()(
  devtools((...args) => {
    return {
      ...mobileNavigationUISlice(...args),
      ...movieCarouselUISlice(...args),
      ...profilesUISlice(...args),
    }
  })
)
