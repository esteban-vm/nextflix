'use server'

import { returnValidationErrors } from 'next-safe-action'
import { createUser, isEmailAvailable } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'
import { RegisterSchema } from '@/lib/validations'

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput }) => {
  const { data, success } = RegisterSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(RegisterSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  const emailExists = await isEmailAvailable(email)

  if (emailExists) {
    returnValidationErrors(RegisterSchema, { _errors: ['El correo electrónico ya está registrado'] })
  }

  await createUser(email, password)
  return { successful: true }
})
