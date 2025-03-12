import type { LoginSchema, ProfileSchema, RegisterSchema } from '@/lib/validations'
import type { User as UserDB, Movie as MovieDB, Profile as ProfileDB } from 'prisma/prisma-client'
import type { PropsWithChildren } from 'react'
import type { z } from 'zod'

declare global {
  namespace Utils {
    type Nullable<T> = T | null
    type PropName = 'movie' | 'profile'

    type WithPlaceholder<T> = T & {
      placeholder: string
    }
  }

  namespace Props {
    interface WithClassName {
      className: string
    }

    type WithChildren<T = unknown> = Required<PropsWithChildren<T>>
    type WithPlaceholder<T extends Utils.PropName, U extends Models.WithImage> = Record<T, Utils.WithPlaceholder<U>>
  }

  namespace Validations {
    type Login = z.infer<typeof LoginSchema>
    type Register = z.infer<typeof RegisterSchema>
    type Profile = z.infer<typeof ProfileSchema>
    type Forms = Login | Register | Profile
  }

  namespace Models {
    type User = Omit<UserDB, 'password'>
    type Profile = ProfileDB

    type Movie = MovieDB
    type PlayingMovie = Omit<MovieDB, 'type' | 'rankingUrl'>
    type TrendingMovie = Omit<MovieDB, 'type'>

    type WithImage = PlayingMovie | TrendingMovie | Profile
  }
}

export {}
