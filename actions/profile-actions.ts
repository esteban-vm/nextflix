'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { returnValidationErrors } from 'next-safe-action'
import { cache } from 'react'
import { toListWithPlaceholders } from '@/lib/adapters'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { ProfileSchema, ItemSchemaWithID } from '@/lib/validations'

export const createOne = authClient
  .schema(ProfileSchema)
  .action(async ({ parsedInput: { name, avatarUrl }, ctx: { user } }) => {
    const userProfiles = await db.profile.count({ where: { userId: user.id } })

    if (userProfiles === 4) {
      returnValidationErrors(ProfileSchema, { _errors: ['Ya no puedes crear más perfiles'] })
    }

    const existingProfile = await db.profile.findFirst({ where: { name, userId: user.id } })

    if (existingProfile) {
      returnValidationErrors(ProfileSchema, { _errors: ['Ya existe un perfil con el nombre ingresado'] })
    }

    await db.profile.create({ data: { userId: user.id, name, avatarUrl } })
    refreshProfilesPage()
  })

export const deleteOne = authClient.schema(ItemSchemaWithID).action(async ({ parsedInput: { id }, ctx: { user } }) => {
  await db.profile.delete({ where: { id, userId: user.id } })
  refreshProfilesPage()
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
