import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MobileNavigationUIManagement {
  isMobileNavigationOpen: boolean
  setIsMobileNavigationOpen: (value: boolean) => void
}

const mobileNavigationUISlice: UISlice<MobileNavigationUIManagement> = (set) => {
  return {
    isMobileNavigationOpen: false,
    setIsMobileNavigationOpen(value) {
      set({ isMobileNavigationOpen: value })
    },
  }
}

interface MovieCarouselUIManagement {
  shouldScrollCarouselIntoView: boolean
  setShouldScrollCarouselIntoView: (value: boolean) => void
  shouldRenderFavoriteMovies: boolean
  setShouldRenderFavoriteMovies: (value: boolean) => void
}

const movieCarouselUISlice: UISlice<MovieCarouselUIManagement> = (set) => {
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

interface ProfilesUIManagement {
  isShowingDeleteProfileAlert: boolean
  setIsShowingDeleteProfileAlert: (value: boolean) => void
  shouldRenderProfiles: boolean
  setShouldRenderProfiles: (value: boolean) => void
}

const profilesUISlice: UISlice<ProfilesUIManagement> = (set) => {
  return {
    isShowingDeleteProfileAlert: false,
    setIsShowingDeleteProfileAlert(value) {
      set({ isShowingDeleteProfileAlert: value })
    },
    shouldRenderProfiles: false,
    setShouldRenderProfiles(value) {
      set({ shouldRenderProfiles: value })
    },
  }
}

type UIStore = MobileNavigationUIManagement & MovieCarouselUIManagement & ProfilesUIManagement
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
