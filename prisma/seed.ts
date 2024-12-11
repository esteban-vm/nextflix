import type { Movie } from '@prisma/client'
import { db } from '@/lib/db'

type PlayingMovie = Omit<Movie, 'id' | 'ranking' | 'createdAt'>
type TrendingMovie = Omit<Movie, 'id' | 'createdAt'>

const playingMovies: PlayingMovie[] = [
  {
    title: 'Flash',
    trailer: '/videos/playing/flash.mp4',
    video: '/videos/playing/flash.mp4',
    thumbnail: '/images/thumbnails/playing/flash.webp',
    genre: ['Drama', 'Family', 'Action'],
    duration: '1h 20 min',
    age: '12',
  },
  {
    title: 'Los feos',
    trailer: '/videos/playing/los-feos.mp4',
    video: '/videos/playing/los-feos.mp4',
    thumbnail: '/images/thumbnails/playing/los-feos.webp',
    genre: ['Drama', 'Family', 'Action'],
    duration: '2h 5 min',
    age: '12',
  },
  {
    title: 'Karate Kid',
    trailer: '/videos/playing/karate-kid.mp4',
    video: '/videos/playing/karate-kid.mp4',
    thumbnail: '/images/thumbnails/playing/karate-kid.webp',
    genre: ['Drama', 'Family', 'Action'],
    duration: '1h 10 min',
    age: '0',
  },
  {
    title: 'Super detective en Hollywood',
    trailer: '/videos/playing/super-detective-en-hollywood.mp4',
    video: '/videos/playing/super-detective-en-hollywood.mp4',
    thumbnail: '/images/thumbnails/playing/super-detective-en-hollywood.webp',
    genre: ['Drama', 'Family', 'Action'],
    duration: '2h 10 min',
    age: '0',
  },
  {
    title: 'Fracture',
    trailer: '/videos/playing/fracture.mp4',
    video: '/videos/playing/fracture.mp4',
    thumbnail: '/images/thumbnails/playing/fracture.webp',
    genre: ['Drama', 'Family', 'Action'],
    duration: '1h 50 min',
    age: '18',
  },
  {
    title: 'Spiderman',
    trailer: '/videos/playing/spiderman.mp4',
    video: '/videos/playing/spiderman.mp4',
    thumbnail: '/images/thumbnails/playing/spiderman.webp',
    genre: ['Action', 'Family', 'Marvel'],
    duration: '2h 30 min',
    age: '0',
  },
  {
    title: 'Al filo del mañana',
    trailer: '/videos/playing/al-filo-del-mañana.mp4',
    video: '/videos/playing/al-filo-del-mañana.mp4',
    thumbnail: '/images/thumbnails/playing/al-filo-del-mañana.webp',
    genre: ['Action', 'Family', 'Marvel'],
    duration: '1h 35 min',
    age: '16',
  },
  {
    title: 'Top Gun',
    trailer: '/videos/playing/top-gun.mp4',
    video: '/videos/playing/top-gun.mp4',
    thumbnail: '/images/thumbnails/playing/top-gun.webp',
    genre: ['Action', 'Family', 'Marvel'],
    duration: '2h 35 min',
    age: '18',
  },
  {
    title: 'Jack Reacher',
    trailer: '/videos/playing/jack-reacher.mp4',
    video: '/videos/playing/jack-reacher.mp4',
    thumbnail: '/images/thumbnails/playing/jack-reacher.webp',
    genre: ['Action', 'Family', 'Marvel'],
    duration: '1h 50 min',
    age: '16',
  },
  {
    title: 'Sonic',
    trailer: '/videos/playing/sonic.mp4',
    video: '/videos/playing/sonic.mp4',
    thumbnail: '/images/thumbnails/playing/sonic.webp',
    genre: ['Action', 'Family', 'Marvel'],
    duration: '2h 05 min',
    age: '18',
  },
]

const trendingMovies: TrendingMovie[] = [
  {
    title: 'La pareja perfecta',
    trailer: '/videos/trending/la-pareja-perfecta.mp4',
    video: '/videos/trending/la-pareja-perfecta.mp4',
    thumbnail: '/images/thumbnails/trending/la-pareja-perfecta.jpg',
    genre: ['Action', 'Adventure'],
    duration: '120 min',
    age: '16',
    ranking: 1,
  },
  {
    title: 'Respira',
    trailer: '/videos/trending/respira.mp4',
    video: '/videos/trending/respira.mp4',
    thumbnail: '/images/thumbnails/trending/respira.jpg',
    genre: ['Drama', 'Thriller'],
    duration: '150 min',
    age: '12',
    ranking: 2,
  },
  {
    title: 'Prison Break',
    trailer: '/videos/trending/prison-break.mp4',
    video: '/videos/trending/prison-break.mp4',
    thumbnail: '/images/thumbnails/trending/prison-break.jpg',
    genre: ['Comedy', 'Family'],
    duration: '90 min',
    age: '18',
    ranking: 3,
  },
  {
    title: 'KAOS',
    trailer: '/videos/trending/kaos.mp4',
    video: '/videos/trending/kaos.mp4',
    thumbnail: '/images/thumbnails/trending/kaos.jpg',
    genre: ['Comedy', 'Family'],
    duration: '90 min',
    age: '0',
    ranking: 4,
  },
  {
    title: 'Accidente',
    trailer: '/videos/trending/accidente.mp4',
    video: '/videos/trending/accidente.mp4',
    thumbnail: '/images/thumbnails/trending/accidente.jpg',
    genre: ['Comedy', 'Family'],
    duration: '90 min',
    age: '12',
    ranking: 5,
  },
]

async function main() {
  await db.movie.deleteMany({})
  await db.movie.createMany({ data: playingMovies })
  await db.movie.createMany({ data: trendingMovies })
}

main()
  .then(() => {
    console.log('Seeding complete')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
