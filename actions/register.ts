'use server'

import { returnValidationErrors } from 'next-safe-action'
import { createUser, isEmailAvailable } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { registerSchema } from '@/lib/validations'

export const register = actionClient.schema(registerSchema).action(async ({ parsedInput }) => {
  const { data, success } = registerSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(registerSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  const emailExists = await isEmailAvailable(email)

  if (emailExists) {
    returnValidationErrors(registerSchema, { _errors: ['El correo electrónico ya está registrado'] })
  }

  await createUser(email, password)
  return { successful: true }
})
