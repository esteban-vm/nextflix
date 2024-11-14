import { AuthError } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return 'Correo electrónico o contraseña incorrectos'
        }

        default: {
          return 'Error al iniciar sesión, intenta de nuevo'
        }
      }
    }
  },
})
