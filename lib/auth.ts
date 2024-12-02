'use server'

import type { Avatar } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'

export const createProfile = async (userId: string, name: string, avatar: Avatar) => {
  const profile = await db.profile.create({
    data: { userId, name, avatar },
    select: { id: true, name: true, avatar: true, userId: true },
  })

  return profile
}

export const deleteProfile = async (id: string, userId: string) => {
  const profile = await db.profile.delete({
    where: { id, userId },
    select: { id: true, name: true, avatar: true, userId: true },
  })

  return profile
}

export const getProfilesByUserId = async (userId: string) => {
  const profiles = await db.profile.findMany({
    where: { userId },
    select: { id: true, name: true, avatar: true, userId: true },
    orderBy: { createdAt: 'desc' },
  })

  return profiles
}

export const handleLogin = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true, email: true, password: true },
  })

  if (!user) {
    throw new CustomAuthError('Correo electrónico no registrado')
  }

  const passwordsMatch = await compare(password, user.password)

  if (!passwordsMatch) {
    throw new CustomAuthError('Contraseña inválida')
  }

  return { id: user.id, email: user.email }
}

export const handleRegister = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10)

  const user = await db.user.create({
    data: { email: email.toLowerCase(), password: hashedPassword },
    select: { id: true, email: true },
  })

  return user
}
