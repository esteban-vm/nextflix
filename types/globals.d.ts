import type { LoginSchema, ProfileSchema, RegisterSchema } from '@/lib/validations'
import type { User } from 'prisma/prisma-client'
import type { z } from 'zod'

declare global {
  type AppUser = Omit<User, 'password'>

  namespace Validations {
    type Login = z.infer<typeof LoginSchema>
    type Profile = z.infer<typeof ProfileSchema>
    type Register = z.infer<typeof RegisterSchema>
    type Forms = Login | Register | Profile
  }
}

export {}
