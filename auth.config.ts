import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { returnValidationErrors } from 'next-safe-action'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'
import { LoginSchema } from '@/lib/validations'

export default {
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<AppUser> {
        const { data, success } = LoginSchema.safeParse(credentials)

        if (!success) {
          returnValidationErrors(LoginSchema, { _errors: ['Datos inválidos'] })
        }

        const { email, password } = data
        const user = await db.user.findUnique({ where: { email: email.toLowerCase() } })

        if (!user) {
          throw new CustomAuthError('Correo electrónico no registrado')
        }

        const passwordsMatch = await compare(password, user.password)

        if (!passwordsMatch) {
          throw new CustomAuthError('Contraseña inválida')
        }

        const { password: _, ...loggedInUser } = user
        return loggedInUser
      },
    }),
  ],
} satisfies NextAuthConfig
