import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProfileModalsState = `is${`${'Adding' | 'Deleting'}Profile` | 'ProfileActionCompleted'}`
type ProfileModalsStates = Record<ProfileModalsState, boolean>
type ProfileModalsAction = `set${Capitalize<ProfileModalsState>}`
type ProfileModalsActions = Record<ProfileModalsAction, (value: boolean) => void>
interface ProfileModalsUI extends ProfileModalsStates, ProfileModalsActions {}

const profileModalsSlice: UISlice<ProfileModalsUI> = (set) => {
  return {
    isAddingProfile: false,
    setIsAddingProfile(value) {
      set({ isAddingProfile: value }, undefined, 'profile-modal-slice:is-adding-profile')
    },
    isDeletingProfile: false,
    setIsDeletingProfile(value) {
      set({ isDeletingProfile: value }, undefined, 'profile-modal-slice:is-deleting-profile')
    },
    isProfileActionCompleted: false,
    setIsProfileActionCompleted(value) {
      set({ isProfileActionCompleted: value }, undefined, 'profile-modal-slice:is-completed')
    },
  }
}

type FavoriteMoviesState = `is${'FetchingAllFavorites' | 'AddingOneFavorite'}`
type FavoriteMoviesStates = Record<FavoriteMoviesState, boolean>
type FavoriteMoviesAction = `set${Capitalize<FavoriteMoviesState>}`
type FavoriteMoviesActions = Record<FavoriteMoviesAction, (value: boolean) => void>
interface FavoriteMoviesUI extends FavoriteMoviesStates, FavoriteMoviesActions {}

const favoriteMoviesSlice: UISlice<FavoriteMoviesUI> = (set) => {
  return {
    isFetchingAllFavorites: false,
    setIsFetchingAllFavorites(value) {
      set({ isFetchingAllFavorites: value }, undefined, 'favorite-movie-slice:is-fetching-all-favorites')
    },
    isAddingOneFavorite: false,
    setIsAddingOneFavorite(value) {
      set({ isAddingOneFavorite: value }, undefined, 'favorite-movie-slice:is-adding-one-favorite')
    },
  }
}

interface MobileNavigationUI {
  isMobileNavigationOpen: boolean
  setIsMobileNavigationOpen: (value: boolean) => void
}

const mobileNavigationSlice: UISlice<MobileNavigationUI> = (set) => {
  return {
    isMobileNavigationOpen: false,
    setIsMobileNavigationOpen(value) {
      set({ isMobileNavigationOpen: value }, undefined, 'mobile-navigation-slice:is-mobile-navigation-open')
    },
  }
}

type UIStore = ProfileModalsUI & FavoriteMoviesUI & MobileNavigationUI
type UISlice<T> = StateCreator<UIStore, [['zustand/devtools', never]], [], T>

export const useUIStore = create<UIStore>()(
  devtools((...args) => {
    return {
      ...profileModalsSlice(...args),
      ...favoriteMoviesSlice(...args),
      ...mobileNavigationSlice(...args),
    }
  })
)
