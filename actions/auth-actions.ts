'use server'

import { hash } from 'bcryptjs'
import { returnValidationErrors } from 'next-safe-action'
import { signIn } from '@/auth'
import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { LoginSchema, RegisterSchema } from '@/lib/validations'

export const login = actionClient.schema(LoginSchema).action(async ({ parsedInput }) => {
  await signIn('credentials', { ...parsedInput, redirect: false })
  return { successful: true }
})

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput }) => {
  const { data, success } = RegisterSchema.safeParse(parsedInput)

  if (!success) {
    returnValidationErrors(RegisterSchema, { _errors: ['Datos inválidos'] })
  }

  const { email, password } = data
  const hashedPassword = await hash(password, 10)
  await db.user.create({ data: { email: email.toLowerCase(), password: hashedPassword } })
  return { successful: true }
})
