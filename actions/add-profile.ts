'use server'

import { returnValidationErrors } from 'next-safe-action'
import { auth } from '@/auth'
import { createProfile } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'
import { ProfileSchema } from '@/lib/validations'

export const addProfile = actionClient.schema(ProfileSchema).action(async ({ parsedInput }) => {
  const session = await auth()
  if (!session?.user.id) return null
  const { data, success } = ProfileSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(ProfileSchema, { _errors: ['Datos inválidos'] })
  }

  const { name, avatar } = data
  await createProfile(session.user.id, name, avatar)
  return { successful: true }
})
