'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { toListWithPlaceholders, toPlayingMovie } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { SchemaWithID } from '@/lib/validations'

export const createOne = authClient
  .schema(SchemaWithID)
  .action(async ({ parsedInput: { id }, ctx: { user } }): Promise<Models.FavoriteMovieDB> => {
    const existingFavorite = await db.favoriteMovie.findFirst({ where: { userId: user.id, movieId: id } })

    if (existingFavorite) {
      returnValidationErrors(SchemaWithID, { _errors: ['La película ya está en tus favoritos'] })
    }

    const favoriteMovie: Models.FavoriteMovieDB = await db.favoriteMovie.create({
      data: { userId: user.id, movieId: id },
      select: { movie: true },
    })

    refreshHomePage()
    return favoriteMovie
  })

export const deleteOne = authClient
  .schema(SchemaWithID)
  .action(async ({ parsedInput: { id }, ctx: { user } }): Promise<Models.FavoriteMovieDB> => {
    const favoriteMovie: Models.FavoriteMovieDB = await db.favoriteMovie.delete({
      where: { userId_movieId: { userId: user.id, movieId: id } },
      select: { movie: true },
    })

    refreshHomePage()
    return favoriteMovie
  })

export const findAll = authClient.action(
  cache(async ({ ctx: { user } }): Promise<Models.PlayingMovie[]> => {
    const results: Models.FavoriteMovieDB[] = await db.favoriteMovie.findMany({
      where: { userId: user.id, movie: { type: 'playing', rankingUrl: { equals: null } } },
      orderBy: { movie: { title: 'asc' } },
      select: { movie: true },
    })

    const movies: Models.Movie[] = await toListWithPlaceholders(results.map(({ movie }) => movie))
    const favoriteMovies: Models.PlayingMovie[] = movies.map(toPlayingMovie)
    return favoriteMovies
  })
)

const refreshHomePage = () => {
  const path: Route = '/'
  revalidatePath(path, 'page')
}
