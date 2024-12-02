import type { User } from 'prisma/prisma-client'

declare global {
  type AppUser = Omit<User, 'password'>
}

export {}
