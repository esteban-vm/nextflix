import { AuthError } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'
import { Prisma } from 'prisma/prisma-client'
import { CustomAuthError } from '@/lib/errors'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof CustomAuthError) {
      return error.message.substring(0, error.message.indexOf('.'))
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return 'Credenciales inválidas'
        }

        case 'Verification': {
          return 'Sesión expirada, inicia sesión nuevamente'
        }

        default: {
          return 'Error de autenticación'
        }
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': {
          return 'El correo electrónico ya está registrado'
        }

        default: {
          return 'Error de servidor'
        }
      }
    }
  },
})
