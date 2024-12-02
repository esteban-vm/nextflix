import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { handleLogin } from '@/lib/auth'
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
      async authorize(credentials) {
        const { data, success } = LoginSchema.safeParse(credentials)
        if (!success) return null
        const { email, password } = data
        const user = await handleLogin(email, password)
        return user
      },
    }),
  ],
} satisfies NextAuthConfig
