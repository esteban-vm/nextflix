'use server'

import type { Profile } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'
import { actionClient } from '@/lib/safe-action'
import { ProfileSchema } from '@/lib/validations'

export const createOne = actionClient.schema(ProfileSchema).action(async ({ parsedInput }): Promise<Profile> => {
  const { data, success } = ProfileSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(ProfileSchema, { _errors: ['Datos inválidos'] })
  }

  const userId = await getUserId()
  const { name, avatar } = data
  const profile = await db.profile.create({ data: { userId, name, avatar } })
  refreshProfilesPage()
  return profile
})

export const getUserProfiles = async (): Promise<Profile[]> => {
  const userId = await getUserId()
  const profiles = await db.profile.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return profiles
}

export const removeOne = async (id: string): Promise<Profile> => {
  const userId = await getUserId()
  const profile = await db.profile.delete({ where: { id: id, userId } })
  refreshProfilesPage()
  return profile
}

const getUserId = async () => {
  const session = await auth()

  if (!session?.user.id) {
    throw new CustomAuthError('No autorizado')
  }

  return session.user.id
}

const refreshProfilesPage = () => {
  revalidatePath('/(routes)/profiles', 'page')
}
