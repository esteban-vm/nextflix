'use server'

import { returnValidationErrors } from 'next-safe-action'
import { signIn } from '@/auth'
import { isEmailAvailable } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { loginSchema } from '@/lib/validations'

export const login = actionClient.schema(loginSchema).action(async ({ parsedInput }) => {
  const { data, success } = loginSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(loginSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  const emailExists = await isEmailAvailable(email)

  if (!emailExists) {
    returnValidationErrors(loginSchema, { _errors: ['El correo electrónico no existe'] })
  }

  await signIn('credentials', { email, password, redirect: false })
  return { successful: true }
})
