'use server'

import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { toListWithPlaceholders, toPlayingMovie, toTrendingMovie } from '@/lib/adapters'
import { db } from '@/lib/db'
import { getPlaceholderImage } from '@/lib/images'
import { authClient } from '@/lib/safe-action'
import { SchemaWithID } from '@/lib/validations'

export const findOneById = authClient.schema(SchemaWithID).action(
  cache(async ({ parsedInput: { id } }): Promise<Models.Movie> => {
    const result = await db.movie.findUnique({ where: { id } })

    if (!result) {
      returnValidationErrors(SchemaWithID, {
        _errors: ['La película no existe'],
      })
    }

    const movie: Models.Movie = {
      ...result,
      placeholder: await getPlaceholderImage(result.posterUrl),
    }

    return movie
  })
)

export const findPlaying = authClient.action(
  cache(async (): Promise<Models.PlayingMovie[]> => {
    const results: Models.MovieDB[] = await db.movie.findMany({
      where: { type: 'playing', rankingUrl: { equals: null } },
      orderBy: { title: 'asc' },
    })

    const movies: Models.Movie[] = await toListWithPlaceholders(results)
    const playingMovies: Models.PlayingMovie[] = movies.map(toPlayingMovie)
    return playingMovies
  })
)

export const findTrending = authClient.action(
  cache(async (): Promise<Models.TrendingMovie[]> => {
    const results: Models.MovieDB[] = await db.movie.findMany({
      where: { type: 'trending', rankingUrl: { not: null } },
      orderBy: { rankingUrl: 'asc' },
    })

    const movies: Models.Movie[] = await toListWithPlaceholders(results)
    const trendingMovies: Models.TrendingMovie[] = movies.map(toTrendingMovie)
    return trendingMovies
  })
)
