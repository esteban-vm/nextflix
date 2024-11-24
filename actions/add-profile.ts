'use server'

import { returnValidationErrors } from 'next-safe-action'
import { auth } from '@/auth'
import { createProfile } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { profileSchema } from '@/lib/validations'

export const addProfile = actionClient.schema(profileSchema).action(async ({ parsedInput }) => {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: 'No autorizado' }
  }

  const { data, success } = profileSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(profileSchema, { _errors: ['Datos inválidos'] })
  }

  const { name, avatar } = data
  await createProfile(session.user.id, name, avatar)
  return { successful: true }
})
