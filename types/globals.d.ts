import type { LoginSchema, ProfileSchema, RegisterSchema } from '@/lib/validations'
import type { User as UserDB, Movie as MovieDB, Profile as ProfileDB } from 'prisma/prisma-client'
import type { PropsWithChildren } from 'react'
import type { z } from 'zod'

declare global {
  type Nullable<T> = T | null

  namespace Props {
    type WithChildren<T = unknown> = Required<PropsWithChildren<T>>

    interface WithClassName {
      className: string
    }

    interface WithProfile {
      profile: Models.Profile
    }

    interface WithPlayingMovie {
      movie: Models.PlayingMovie
    }

    interface WithTrendingMovie {
      movie: Models.TrendingMovie
    }
  }

  namespace Validations {
    type Login = z.infer<typeof LoginSchema>
    type Profile = z.infer<typeof ProfileSchema>
    type Register = z.infer<typeof RegisterSchema>
    type Forms = Login | Register | Profile
  }

  namespace Models {
    type User = Omit<UserDB, 'password'>
    type Profile = ProfileDB
    type Movie = MovieDB
    type PlayingMovie = Omit<MovieDB, 'type' | 'ranking'>
    type TrendingMovie = Omit<MovieDB, 'type'>
  }
}

export {}
