import { AuthError } from 'next-auth'
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'
import { Prisma } from 'prisma/prisma-client'
import { auth } from '@/auth'
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

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const authClient = actionClient.use(async ({ next }) => {
  const session = await auth()

  if (!session?.user) {
    throw new CustomAuthError('No autorizado')
  }

  return next({ ctx: { user: session.user } })
})
