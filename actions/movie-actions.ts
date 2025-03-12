'use server'

import { cache } from 'react'
import { toListWithPlaceholders, toPlayingMovie, toTrendingMovie } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'

export const findPlaying = authClient.action(
  cache(async (): Promise<Utils.WithPlaceholder<Models.PlayingMovie>[]> => {
    const results = await db.movie.findMany({ where: { type: 'playing' }, orderBy: { title: 'asc' } })
    const movies = await toListWithPlaceholders(results.map(toPlayingMovie))
    return movies
  })
)

export const findTrending = authClient.action(
  cache(async (): Promise<Utils.WithPlaceholder<Models.TrendingMovie>[]> => {
    const results = await db.movie.findMany({ where: { type: 'trending' }, orderBy: { rankingUrl: 'asc' } })
    const movies = await toListWithPlaceholders(results.map(toTrendingMovie))
    return movies
  })
)
