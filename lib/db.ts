import type { Avatar } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

export const createProfile = async (userId: string, name: string, avatar: Avatar) => {
  await db.profile.create({ data: { userId, name, avatar } })
}

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10)
  await db.user.create({ data: { email, password: hashedPassword } })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

export const isEmailAvailable = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } })
  return !!user
}
