'use server'

import type { Movie } from '@prisma/client'
import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'

export const findPlaying = actionClient.action(async (): Promise<Movie[]> => {
  const movies = await db.movie.findMany({ where: { ranking: { equals: null } }, orderBy: { title: 'asc' } })
  return movies
})

export const findTrending = actionClient.action(async (): Promise<Movie[]> => {
  const movies = await db.movie.findMany({ where: { ranking: { not: null } }, orderBy: { ranking: 'asc' } })
  return movies
})
