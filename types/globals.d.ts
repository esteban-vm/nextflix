import type { LoginSchema, ProfileSchema, RegisterSchema } from '@/lib/validations'
import type { User as UserType, Movie as MovieType, Profile as ProfileType } from 'prisma/prisma-client'
import type { PropsWithChildren } from 'react'
import type { z } from 'zod'

declare global {
  type WithChildren<P = unknown> = Readonly<Required<PropsWithChildren<P>>>

  namespace Validations {
    type Login = z.infer<typeof LoginSchema>
    type Profile = z.infer<typeof ProfileSchema>
    type Register = z.infer<typeof RegisterSchema>
    type Forms = Login | Register | Profile
  }

  namespace Models {
    type User = Omit<UserType, 'password'>
    type Profile = ProfileType
    type Movie = MovieType
  }
}

export {}
