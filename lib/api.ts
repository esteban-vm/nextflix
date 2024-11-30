import type { Avatar } from '@prisma/client'
import { hash } from 'bcryptjs'
import { db } from '@/lib/db'

export const createProfile = async (userId: string, name: string, avatar: Avatar) => {
  await db.profile.create({ data: { userId, name, avatar } })
}

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10)
  await db.user.create({ data: { email, password: hashedPassword } })
}

export const deleteProfile = async (userId: string) => {
  await db.profile.delete({ where: { id: '', userId } })
}

export const isEmailAvailable = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } })
  return !!user
}
