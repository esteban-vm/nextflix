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
      set({ isMobileNavigationOpen: value }, undefined, 'ui:mobile-navigation/set-is-mobile-navigation-open')
    },
  }
}

interface MovieCarouselUISlice {
  shouldScrollCarouselIntoView: boolean
  setShouldScrollCarouselIntoView: (value: boolean) => void
  shouldRenderFavoriteMovies: boolean
  setShouldRenderFavoriteMovies: (value: boolean) => void

  // isScrollingCarouselIntoView: boolean
  // startScrollingCarouselIntoView: () => void
  // endScrollingCarouselIntoView: () => void

  // isRenderingFavoriteMovies: boolean
  // startRenderingFavoriteMovies: () => void
  // endRenderingFavoriteMovies: () => void
}

const movieCarouselUISlice: UISlice<MovieCarouselUISlice> = (set) => {
  return {
    shouldScrollCarouselIntoView: false,
    setShouldScrollCarouselIntoView(value) {
      set({ shouldScrollCarouselIntoView: value }, undefined, 'ui:movie-carousel/set-should-scroll-carousel-into-view')
    },
    shouldRenderFavoriteMovies: false,
    setShouldRenderFavoriteMovies(value) {
      set({ shouldRenderFavoriteMovies: value }, undefined, 'ui:movie-carousel/set-should-render-favorite-movies')
    },
  }
}

interface ProfilesUISlice {
  isDeleteProfileAlertHidden: boolean
  setIsDeleteProfileAlertHidden: (value: boolean) => void
  shouldRenderProfiles: boolean
  setShouldRenderProfiles: (value: boolean) => void

  // openDeleteProfileAlert: () => void
  // hideDeleteProfileAlert: () => void
  // isRenderingProfiles: boolean
  // startRenderingProfiles: () => void
  // endRenderingProfiles: () => void
}

const profilesUISlice: UISlice<ProfilesUISlice> = (set) => {
  return {
    isDeleteProfileAlertHidden: true,
    setIsDeleteProfileAlertHidden(value) {
      set({ isDeleteProfileAlertHidden: value }, undefined, 'ui:profiles/set-is-delete-profile-alert-hidden')
    },
    shouldRenderProfiles: false,
    setShouldRenderProfiles(value) {
      set({ shouldRenderProfiles: value }, undefined, 'ui:profiles/set-should-render-profiles')
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
