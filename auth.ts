import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { loginSchema } from '@/lib/validations'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub
      return session
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        const { data, success } = loginSchema.safeParse(credentials)
        if (!success) return null
        const user = await db.user.findUnique({ where: { email: data.email } })
        if (!user) return null
        const passwordsMatch = await compare(data.password, user.password)
        if (!passwordsMatch) return null
        const { id, email, name, image } = user
        return { id, email, name, image }
      },
    }),
  ],
})
