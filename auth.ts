import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { db } from '@/lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [],
})
