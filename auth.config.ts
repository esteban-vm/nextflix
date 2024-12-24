import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { CustomAuthError } from '@/lib/errors'

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
        const { email, password } = <Validations.Login>credentials
        const user = await db.user.findUnique({ where: { email } })

        if (!user) {
          throw new CustomAuthError('Correo electrónico no registrado')
        }

        const passwordsMatch = await compare(password, user.password)

        if (!passwordsMatch) {
          throw new CustomAuthError('Contraseña inválida')
        }

        const { password: _, ...appUser } = user
        return appUser
      },
    }),
  ],
} satisfies NextAuthConfig
