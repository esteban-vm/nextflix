import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'

export default {
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<Models.User> {
        const { email, password } = <Validations.Login>credentials
        const userFromDb = await db.user.findUnique({ where: { email } })

        if (!userFromDb) {
          throw new CustomAuthError('Correo electrónico no registrado')
        }

        const passwordsMatch = await compare(password, userFromDb.password)

        if (!passwordsMatch) {
          throw new CustomAuthError('Contraseña inválida')
        }

        const { password: _, ...loggedUser } = userFromDb
        return loggedUser
      },
    }),
  ],
} satisfies NextAuthConfig
