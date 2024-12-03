'use server'

import type { Avatar, Profile } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'

export const createProfile = async (userId: string, name: string, avatar: Avatar): Promise<Profile> => {
  const profile = await db.profile.create({ data: { userId, name, avatar } })
  return profile
}

export const deleteProfile = async (profileId: string, userId: string): Promise<Profile> => {
  const profile = await db.profile.delete({ where: { id: profileId, userId } })
  revalidatePath('/(routes)/profiles', 'page')
  return profile
}

export const getProfilesByUserId = async (userId: string): Promise<Profile[]> => {
  const profiles = await db.profile.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return profiles
}

export const handleLogin = async (email: string, password: string): Promise<AppUser> => {
  const user = await db.user.findUnique({ where: { email: email.toLowerCase() } })

  if (!user) {
    throw new CustomAuthError('Correo electrónico no registrado')
  }

  const passwordsMatch = await compare(password, user.password)

  if (!passwordsMatch) {
    throw new CustomAuthError('Contraseña inválida')
  }

  const { password: _, ...loggedInUser } = user
  return loggedInUser
}

export const handleRegister = async (email: string, password: string): Promise<AppUser> => {
  const hashedPassword = await hash(password, 10)

  const newUser = await db.user.create({
    data: { email: email.toLowerCase(), password: hashedPassword },
    select: { id: true, email: true, role: true, gender: true, createdAt: true, updatedAt: true },
  })

  return newUser
}
