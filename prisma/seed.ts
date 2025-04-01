import type { AvatarUrl } from '@/lib/constants'
import type { Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { db } from '@/lib/db'
import { movies, users } from '@/prisma/data'

async function cleanDataBase() {
  const args: Prisma.UserWhereInput = { email: { not: { equals: 'test@email.com' } } }

  await db.favoriteMovie.deleteMany({ where: { user: args } })
  await db.movie.deleteMany({ where: { favorites: { every: { user: args } } } })
  await db.profile.deleteMany({ where: { user: args } })
  await db.user.deleteMany({ where: args })
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

async function insertRelationalData() {
  const user1 = await db.user.findUniqueOrThrow({ where: { email: users[0].email } })

  const movie1 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[0].title } })
  const movie2 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[2].title } })
  const movie3 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[5].title } })
  const movie4 = await db.movie.findUniqueOrThrow({ where: { title: movies.playing[8].title } })

  await db.favoriteMovie.createMany({
    data: [
      { userId: user1.id, movieId: movie1.id },
      { userId: user1.id, movieId: movie2.id },
      { userId: user1.id, movieId: movie3.id },
      { userId: user1.id, movieId: movie4.id },
    ],
  })

  const avatar1: AvatarUrl = '/images/avatars/avatar1.webp'
  const avatar2: AvatarUrl = '/images/avatars/avatar2.webp'
  const avatar3: AvatarUrl = '/images/avatars/avatar3.webp'
  const avatar4: AvatarUrl = '/images/avatars/avatar4.webp'

  await db.profile.createMany({
    data: [
      { name: 'Sergio', avatarUrl: avatar1, userId: user1.id },
      { name: 'Clara', avatarUrl: avatar2, userId: user1.id },
      { name: 'Carlos', avatarUrl: avatar3, userId: user1.id },
      { name: 'Ana', avatarUrl: avatar4, userId: user1.id },
    ],
  })
}

void (async function () {
  try {
    console.log('Seeding started')
    await cleanDataBase()
    await insertInitialData()
    await insertRelationalData()
    console.log('Seeding completed')
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
})()
