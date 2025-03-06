import type { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { getPlaceholderImage } from '@/lib/images'

const playingMoviesData: Omit<Prisma.MovieCreateInput, 'placeholder'>[] = [
  {
    title: 'Flash',
    trailer: '/videos/playing/flash.mp4',
    video: '/videos/playing/flash.mp4',
    thumbnail: '/images/thumbnails/playing/flash.webp',
    genres: ['Drama', 'Family', 'Action'],
    duration: '1h 20 min',
    age: 12,
    type: 'playing',
  },
  {
    title: 'Los feos',
    trailer: '/videos/playing/los-feos.mp4',
    video: '/videos/playing/los-feos.mp4',
    thumbnail: '/images/thumbnails/playing/los-feos.webp',
    genres: ['Drama', 'Family', 'Action'],
    duration: '2h 5 min',
    age: 12,
    type: 'playing',
  },
  {
    title: 'Karate Kid',
    trailer: '/videos/playing/karate-kid.mp4',
    video: '/videos/playing/karate-kid.mp4',
    thumbnail: '/images/thumbnails/playing/karate-kid.webp',
    genres: ['Drama', 'Family', 'Action'],
    duration: '1h 10 min',
    age: 0,
    type: 'playing',
  },
  {
    title: 'Super detective en Hollywood',
    trailer: '/videos/playing/super-detective-en-hollywood.mp4',
    video: '/videos/playing/super-detective-en-hollywood.mp4',
    thumbnail: '/images/thumbnails/playing/super-detective-en-hollywood.webp',
    genres: ['Drama', 'Family', 'Action'],
    duration: '2h 10 min',
    age: 0,
    type: 'playing',
  },
  {
    title: 'Fracture',
    trailer: '/videos/playing/fracture.mp4',
    video: '/videos/playing/fracture.mp4',
    thumbnail: '/images/thumbnails/playing/fracture.webp',
    genres: ['Drama', 'Family', 'Action'],
    duration: '1h 50 min',
    age: 18,
    type: 'playing',
  },
  {
    title: 'Spiderman',
    trailer: '/videos/playing/spiderman.mp4',
    video: '/videos/playing/spiderman.mp4',
    thumbnail: '/images/thumbnails/playing/spiderman.webp',
    genres: ['Action', 'Family', 'Marvel'],
    duration: '2h 30 min',
    age: 0,
    type: 'playing',
  },
  {
    title: 'Al filo del mañana',
    trailer: '/videos/playing/al-filo-del-mañana.mp4',
    video: '/videos/playing/al-filo-del-mañana.mp4',
    thumbnail: '/images/thumbnails/playing/al-filo-del-mañana.webp',
    genres: ['Action', 'Family', 'Marvel'],
    duration: '1h 35 min',
    age: 16,
    type: 'playing',
  },
  {
    title: 'Top Gun',
    trailer: '/videos/playing/top-gun.mp4',
    video: '/videos/playing/top-gun.mp4',
    thumbnail: '/images/thumbnails/playing/top-gun.webp',
    genres: ['Action', 'Family', 'Marvel'],
    duration: '2h 35 min',
    age: 18,
    type: 'playing',
  },
  {
    title: 'Jack Reacher',
    trailer: '/videos/playing/jack-reacher.mp4',
    video: '/videos/playing/jack-reacher.mp4',
    thumbnail: '/images/thumbnails/playing/jack-reacher.webp',
    genres: ['Action', 'Family', 'Marvel'],
    duration: '1h 50 min',
    age: 16,
    type: 'playing',
  },
  {
    title: 'Sonic',
    trailer: '/videos/playing/sonic.mp4',
    video: '/videos/playing/sonic.mp4',
    thumbnail: '/images/thumbnails/playing/sonic.webp',
    genres: ['Action', 'Family', 'Marvel'],
    duration: '2h 05 min',
    age: 18,
    type: 'playing',
  },
]

const trendingMoviesData: Omit<Prisma.MovieCreateInput, 'placeholder'>[] = [
  {
    title: 'La pareja perfecta',
    trailer: '/videos/trending/la-pareja-perfecta.mp4',
    video: '/videos/trending/la-pareja-perfecta.mp4',
    thumbnail: '/images/thumbnails/trending/la-pareja-perfecta.jpg',
    genres: ['Action', 'Adventure'],
    duration: '120 min',
    age: 16,
    type: 'trending',
    ranking: 'ranking1',
  },
  {
    title: 'Respira',
    trailer: '/videos/trending/respira.mp4',
    video: '/videos/trending/respira.mp4',
    thumbnail: '/images/thumbnails/trending/respira.jpg',
    genres: ['Drama', 'Thriller'],
    duration: '150 min',
    age: 12,
    type: 'trending',
    ranking: 'ranking2',
  },
  {
    title: 'Prison Break',
    trailer: '/videos/trending/prison-break.mp4',
    video: '/videos/trending/prison-break.mp4',
    thumbnail: '/images/thumbnails/trending/prison-break.jpg',
    genres: ['Comedy', 'Family'],
    duration: '90 min',
    age: 18,
    type: 'trending',
    ranking: 'ranking3',
  },
  {
    title: 'KAOS',
    trailer: '/videos/trending/kaos.mp4',
    video: '/videos/trending/kaos.mp4',
    thumbnail: '/images/thumbnails/trending/kaos.jpg',
    genres: ['Comedy', 'Family'],
    duration: '90 min',
    age: 0,
    type: 'trending',
    ranking: 'ranking4',
  },
  {
    title: 'Accidente',
    trailer: '/videos/trending/accidente.mp4',
    video: '/videos/trending/accidente.mp4',
    thumbnail: '/images/thumbnails/trending/accidente.jpg',
    genres: ['Comedy', 'Family'],
    duration: '90 min',
    age: 12,
    type: 'trending',
    ranking: 'ranking5',
  },
]

void (async () => {
  try {
    await db.movie.deleteMany({})

    const playingMovies = await Promise.all(
      playingMoviesData.map(async (movie): Promise<Prisma.MovieCreateInput> => {
        return {
          ...movie,
          placeholder: await getPlaceholderImage(movie.thumbnail),
        }
      })
    )

    const trendingMovies = await Promise.all(
      trendingMoviesData.map(async (movie): Promise<Prisma.MovieCreateInput> => {
        return {
          ...movie,
          placeholder: await getPlaceholderImage(movie.thumbnail),
        }
      })
    )

    await db.movie.createMany({ data: playingMovies })
    await db.movie.createMany({ data: trendingMovies })
    console.log('Seeding complete')
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
})()
