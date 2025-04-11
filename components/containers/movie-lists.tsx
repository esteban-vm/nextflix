import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect } from 'react'
import { MovieActions, FavoriteMovieActions } from '@/actions'
import { LoadingSpinner } from '@/components/common'
import { HomeUI } from '@/components/pages'
import { useProfileStore } from '@/hooks'

export function FavoriteMovieList() {
  const { currentProfile, refetchFavorites, setRefetchFavorites } = useProfileStore()
  const { execute, result, isPending, hasSucceeded } = useAction(FavoriteMovieActions.findAllById)
  const favoriteMovies = result?.data ?? []
  const isEmpty = favoriteMovies.length === 0

  const fetchCurrentProfile = useCallback(() => {
    if (currentProfile) {
      if (refetchFavorites) setRefetchFavorites(false)
      execute({ id: currentProfile.id })
    }
  }, [currentProfile, execute, refetchFavorites, setRefetchFavorites])

  useEffect(fetchCurrentProfile, [fetchCurrentProfile])

  if (!currentProfile) {
    return <HomeUI.MovieAlert>Hola, empieza seleccionando un perfil.</HomeUI.MovieAlert>
  }

  if (isPending) {
    return <LoadingSpinner className='mx-auto h-16' />
  }

  if (isEmpty && hasSucceeded) {
    return (
      <HomeUI.MovieAlert>
        Hola <span className='font-semibold not-italic'>{currentProfile.name}</span>, parece aún no tienes películas
        favoritas.
      </HomeUI.MovieAlert>
    )
  }

  return (
    <HomeUI.MovieCarousel>
      {favoriteMovies.map((movie) => (
        <HomeUI.MovieCarouselItem key={movie.id} movie={movie} isFavorite />
      ))}
    </HomeUI.MovieCarousel>
  )
}

export function PlayingMovieList() {
  const { execute, result, isPending, hasSucceeded } = useAction(MovieActions.findPlaying)
  const playingMovies = result?.data ?? []
  const isEmpty = playingMovies.length === 0

  useEffect(execute, [execute])

  if (isPending) {
    return <LoadingSpinner className='mx-auto h-16' />
  }

  if (isEmpty && hasSucceeded) {
    return <HomeUI.MovieAlert>Sin películas actuales</HomeUI.MovieAlert>
  }

  return (
    <HomeUI.MovieCarousel>
      {playingMovies.map((movie) => (
        <HomeUI.MovieCarouselItem key={movie.id} movie={movie} />
      ))}
    </HomeUI.MovieCarousel>
  )
}
