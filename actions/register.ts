'use server'

import { returnValidationErrors } from 'next-safe-action'
import { handleRegister } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'
import { RegisterSchema } from '@/lib/validations'

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput }) => {
  const { data, success } = RegisterSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(RegisterSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  await handleRegister(email, password)
  return { successful: true }
})
