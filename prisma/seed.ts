import type { Prisma } from '@prisma/client'
import { playing, trending } from '@/data.json'
import { db } from '@/lib/db'

const playingMovies = <Prisma.MovieCreateManyInput[]>playing
const trendingMovies = <Prisma.MovieCreateManyInput[]>trending

void (async () => {
  try {
    await db.movie.deleteMany({})
    await db.movie.createMany({ data: playingMovies })
    await db.movie.createMany({ data: trendingMovies })
    console.log('Seeding complete')
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
})()
