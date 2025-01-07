'use server'

import type { Movie } from '@prisma/client'
import { cache } from 'react'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'

export const findPlaying = authClient.action(
  cache(async (): Promise<Movie[]> => {
    const movies = await db.movie.findMany({ where: { ranking: { equals: null } }, orderBy: { title: 'asc' } })
    return movies
  })
)

export const findTrending = authClient.action(
  cache(async (): Promise<Movie[]> => {
    const movies = await db.movie.findMany({ where: { ranking: { not: null } }, orderBy: { ranking: 'asc' } })
    return movies
  })
)
