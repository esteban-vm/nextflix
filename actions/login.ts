'use server'

import { returnValidationErrors } from 'next-safe-action'
import { signIn } from '@/auth'
import { isEmailAvailable } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { LoginSchema } from '@/lib/validations'

export const login = actionClient.schema(LoginSchema).action(async ({ parsedInput }) => {
  const { data, success } = LoginSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(LoginSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  const emailExists = await isEmailAvailable(email)

  if (!emailExists) {
    returnValidationErrors(LoginSchema, { _errors: ['El correo electrónico no existe'] })
  }

  await signIn('credentials', { email, password, redirect: false })
  return { successful: true }
})
