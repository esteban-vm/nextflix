import type { LoginSchema, ProfileSchema, RegisterSchema } from '@/lib/validations'
import type { User as PrismaUser, Movie as PrismaMovie, Profile as PrismaProfile } from 'prisma/prisma-client'
import type { PropsWithChildren } from 'react'
import type { z } from 'zod'

declare global {
  namespace Utils {
    type Nullable<T> = T | null

    type WithPlaceholder<T extends Models.MovieOrProfileDB> = T & {
      placeholder: string
    }
  }

  namespace Props {
    interface WithClassName {
      className: string
    }

    type WithChildren<T = unknown> = Required<PropsWithChildren<T>>
  }

  namespace Models {
    type User = Omit<PrismaUser, 'password'>

    type MovieDB = PrismaMovie
    type ProfileDB = PrismaProfile
    type MovieOrProfileDB = MovieDB | ProfileDB

    type Movie = Utils.WithPlaceholder<MovieDB>
    type Profile = Utils.WithPlaceholder<ProfileDB>
    type PlayingMovie = Omit<Movie, 'type' | 'rankingUrl'>
    type TrendingMovie = Omit<Movie, 'type'>

    interface FavoriteMovieDB {
      movie: MovieDB
    }
  }

  namespace Validations {
    type Login = z.infer<typeof LoginSchema>
    type Register = z.infer<typeof RegisterSchema>
    type Profile = z.infer<typeof ProfileSchema>
    type Forms = Login | Register | Profile
  }
}

export {}
