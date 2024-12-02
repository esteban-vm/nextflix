import type { User } from 'prisma/prisma-client'

type AppUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>

declare module 'next-auth' {
  interface Session {
    user: AppUser
  }
}
