'use server'

import { hash } from 'bcryptjs'
import { signIn } from '@/auth'
import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { LoginSchema, RegisterSchema } from '@/lib/validations'

export const login = actionClient.schema(LoginSchema).action(async ({ parsedInput: { email, password } }) => {
  await signIn('credentials', { email, password, redirect: false })
  return { successful: true }
})

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput: { email, password } }) => {
  const hashedPassword = await hash(password, 10)
  await db.user.create({ data: { email, password: hashedPassword } })
  return { successful: true }
})
