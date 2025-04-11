'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { toListWithPlaceholders, toPlayingMovie } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { FavoriteMovieSchema, SchemaWithID } from '@/lib/validations'

export const createOne = authClient
  .schema(FavoriteMovieSchema)
  .action(async ({ parsedInput: { profileId, movieId }, ctx: { user } }): Promise<Models.FavoriteMovieDB> => {
    const existingFavorite = await db.favoriteMovie.findFirst({
      where: { profileId, movieId, profile: { userId: user.id } },
      select: { movie: { select: { title: true } } },
    })

    if (existingFavorite) {
      returnValidationErrors(FavoriteMovieSchema, {
        _errors: [`La película "${existingFavorite.movie.title}" ya está en tus favoritos`],
      })
    }

    const favoriteMovie: Models.FavoriteMovieDB = await db.favoriteMovie.create({
      data: { profileId, movieId },
      select: { movie: true },
    })

    refreshHomePage()
    return favoriteMovie
  })

export const deleteOne = authClient
  .schema(FavoriteMovieSchema)
  .action(async ({ parsedInput: { profileId, movieId }, ctx: { user } }): Promise<Models.FavoriteMovieDB> => {
    const favoriteMovie: Models.FavoriteMovieDB = await db.favoriteMovie.delete({
      where: { profileId_movieId: { profileId, movieId }, profile: { userId: user.id } },
      select: { movie: true },
    })

    refreshHomePage()
    return favoriteMovie
  })

export const findAllById = authClient.schema(SchemaWithID).action(
  cache(async ({ parsedInput: { id }, ctx: { user } }): Promise<Models.PlayingMovie[]> => {
    const results: Models.FavoriteMovieDB[] = await db.favoriteMovie.findMany({
      where: { profileId: id, profile: { userId: user.id }, movie: { type: 'playing', rankingUrl: { equals: null } } },
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
