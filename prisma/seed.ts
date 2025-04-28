import type { Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { avatarUrls } from '@/lib/constants'
import { db } from '@/lib/db'
import { movies, users } from '@/prisma/data'

async function cleanDataBase() {
  const input: Prisma.UserWhereInput = { email: { not: { equals: 'test@email.com' } } }

  await db.favoriteMovie.deleteMany({ where: { profile: { user: input } } })
  await db.movie.deleteMany({ where: { favoriteMovies: { every: { profile: { user: input } } } } })
  await db.profile.deleteMany({ where: { user: input } })
  await db.user.deleteMany({ where: input })
}

async function insertInitialData() {
  await db.user.createMany({
    data: users.map((user) => {
      return {
        ...user,
        password: hashSync(user.password),
      }
    }),
  })

  await db.movie.createMany({ data: [...movies.playing, ...movies.trending] })
}

async function insertAdditionalData() {
  const user1 = await db.user.findUniqueOrThrow({ where: { email: users[0].email } })

  const [profile1, profile2, profile3] = await db.profile.createManyAndReturn({
    data: [
      { name: 'Sergio', avatarUrl: avatarUrls[0], userId: user1.id },
      { name: 'Clara', avatarUrl: avatarUrls[1], userId: user1.id },
      { name: 'Ana', avatarUrl: avatarUrls[3], userId: user1.id },
    ],
  })

  const movie1 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[0].title } })
  const movie2 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[2].title } })
  const movie3 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[5].title } })
  const movie4 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[8].title } })
  const movie5 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[7].title } })
  const movie6 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[4].title } })
  const movie7 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[1].title } })
  const movie8 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[9].title } })

  await db.favoriteMovie.createMany({
    data: [
      { profileId: profile1.id, movieId: movie1.id },
      { profileId: profile1.id, movieId: movie2.id },
      { profileId: profile1.id, movieId: movie3.id },
      { profileId: profile1.id, movieId: movie4.id },

      { profileId: profile2.id, movieId: movie5.id },
      { profileId: profile2.id, movieId: movie6.id },
      { profileId: profile2.id, movieId: movie7.id },
      { profileId: profile2.id, movieId: movie8.id },

      { profileId: profile3.id, movieId: movie3.id },
      { profileId: profile3.id, movieId: movie4.id },
      { profileId: profile3.id, movieId: movie5.id },
      { profileId: profile3.id, movieId: movie6.id },
      { profileId: profile3.id, movieId: movie7.id },
    ],
  })
}

void (async function () {
  try {
    console.log('Seeding started')
    await cleanDataBase()
    await insertInitialData()
    await insertAdditionalData()
    console.log('Seeding completed')
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
})()
