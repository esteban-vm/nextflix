'use client'

import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect } from 'react'
import { FavoriteMovieActions } from '@/actions'
import { LoadingSpinner } from '@/components/common'
import { MovieAlert, MovieCarousel, MovieItem } from '@/components/pages'
import { useProfileStore } from '@/hooks'

export function FavoriteMovies() {
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
    return <MovieAlert>Hola, empieza seleccionando un perfil.</MovieAlert>
  }

  if (isPending) {
    return <LoadingSpinner className='mx-auto h-16' />
  }

  if (isEmpty && hasSucceeded) {
    return (
      <MovieAlert>
        Hola <span className='font-semibold not-italic'>{currentProfile.name}</span>, parece aún no tienes películas
        favoritas.
      </MovieAlert>
    )
  }

  return (
    <MovieCarousel>
      {favoriteMovies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} isFavorite />
      ))}
    </MovieCarousel>
  )
}
