'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { ProfileSchema, WithID } from '@/lib/validations'

export const createOne = authClient
  .schema(ProfileSchema)
  .action(async ({ parsedInput: { name, avatar }, ctx: { userId } }): Promise<Models.Profile> => {
    const userProfiles = await db.profile.count({ where: { userId } })

    if (userProfiles === 5) {
      returnValidationErrors(ProfileSchema, { _errors: ['Ya no puedes crear más perfiles'] })
    }

    const existingProfile = await db.profile.findFirst({ where: { name, userId } })

    if (existingProfile) {
      returnValidationErrors(ProfileSchema, { _errors: ['Ya existe un perfil con el nombre ingresado'] })
    }

    const createdProfile = await db.profile.create({ data: { userId, name, avatar } })
    refreshProfilesPage()
    return createdProfile
  })

export const deleteOne = authClient
  .schema(WithID)
  .action(async ({ parsedInput: { id }, ctx: { userId } }): Promise<Models.Profile> => {
    const deletedProfile = await db.profile.delete({ where: { id, userId } })
    refreshProfilesPage()
    return deletedProfile
  })

export const findAll = authClient.action(
  cache(async ({ ctx: { userId } }): Promise<Models.Profile[]> => {
    const allProfiles = await db.profile.findMany({ where: { userId }, orderBy: { name: 'asc' } })
    return allProfiles
  })
)

const refreshProfilesPage = () => {
  const path: Route = '/profiles'
  revalidatePath(path, 'page')
}
