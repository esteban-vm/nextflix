'use server'

import type { Profile } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'
import { authClient } from '@/lib/safe-action'
import { ProfileSchema } from '@/lib/validations'

export const createOne = authClient
  .schema(ProfileSchema)
  .action(async ({ parsedInput: { name, avatar }, ctx: { userId } }): Promise<Profile> => {
    const profile = await db.profile.create({ data: { userId, name, avatar } })
    refreshProfilesPage()
    return profile
  })

export const deleteOne = authClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { userId } }): Promise<Profile> => {
    const profile = await db.profile.delete({ where: { id, userId } })
    refreshProfilesPage()
    return profile
  })

export const findAll = authClient.action(async ({ ctx: { userId } }): Promise<Profile[]> => {
  const profiles = await db.profile.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return profiles
})

const refreshProfilesPage = () => {
  revalidatePath('/(routes)/profiles', 'page')
}
