'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { toListWithPlaceholders } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { ProfileSchema, SchemaWithID } from '@/lib/validations'

export const createOne = authClient
  .schema(ProfileSchema)
  .action(async ({ parsedInput: { name, avatarUrl }, ctx: { user } }): Promise<Models.ProfileDB> => {
    const userProfiles = await db.profile.count({ where: { userId: user.id } })

    if (userProfiles === 4) {
      returnValidationErrors(ProfileSchema, { _errors: ['Ya no puedes crear más perfiles'] })
    }

    const existingProfile = await db.profile.findFirst({
      where: { name, userId: user.id },
      select: { name: true },
    })

    if (existingProfile) {
      returnValidationErrors(ProfileSchema, {
        _errors: [`El perfil de ${existingProfile.name} ya existe`],
      })
    }

    const profile: Models.ProfileDB = await db.profile.create({
      data: { userId: user.id, name, avatarUrl },
    })

    refreshProfilesPage()
    return profile
  })

export const deleteOne = authClient
  .schema(SchemaWithID)
  .action(async ({ parsedInput: { id }, ctx: { user } }): Promise<Models.ProfileDB> => {
    const profile: Models.ProfileDB = await db.profile.delete({ where: { id, userId: user.id } })
    refreshProfilesPage()
    return profile
  })

export const findAll = authClient.action(
  cache(async ({ ctx: { user } }): Promise<Models.Profile[]> => {
    const results: Models.ProfileDB[] = await db.profile.findMany({
      where: { userId: user.id },
      orderBy: { name: 'asc' },
    })

    const profiles: Models.Profile[] = await toListWithPlaceholders(results)
    return profiles
  })
)

const refreshProfilesPage = () => {
  const path: Route = '/profiles'
  revalidatePath(path, 'page')
}
