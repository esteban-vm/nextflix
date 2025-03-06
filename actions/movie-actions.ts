'use server'

import { cache } from 'react'
import { db } from '@/lib/db'
import { toPlayingMovie, toTrendingMovie } from '@/lib/movies'
import { authClient } from '@/lib/safe-action'

export const findPlaying = authClient.action(
  cache(async () => {
    const results = await db.movie.findMany({ where: { type: 'playing' }, orderBy: { title: 'asc' } })
    const movies = results.map(toPlayingMovie)
    return movies
  })
)

export const findTrending = authClient.action(
  cache(async () => {
    const results = await db.movie.findMany({ where: { type: 'trending' }, orderBy: { ranking: 'asc' } })
    const movies = results.map(toTrendingMovie)
    return movies
  })
)
