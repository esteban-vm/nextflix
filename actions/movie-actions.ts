'use server'

import { cache } from 'react'
import { toListWithPlaceholders, toPlayingMovie, toTrendingMovie } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'

export const findPlaying = authClient.action(
  cache(async (): Promise<Models.PlayingMovie[]> => {
    const results: Models.MovieDB[] = await db.movie.findMany({
      where: { type: 'playing' },
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
      where: { type: 'trending' },
      orderBy: { rankingUrl: 'asc' },
    })

    const movies: Models.Movie[] = await toListWithPlaceholders(results)
    const trendingMovies: Models.TrendingMovie[] = movies.map(toTrendingMovie)
    return trendingMovies
  })
)
