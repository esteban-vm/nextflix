import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10)
  await db.user.create({ data: { email, password: hashedPassword }, select: { id: true, email: true } })
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

export const isEmailAvailable = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } })
  return !!user
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
