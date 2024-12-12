import { auth } from '@/auth'
import { CustomAuthError } from '@/lib/errors'

export const getUserId = async () => {
  const session = await auth()

  if (!session?.user.id) {
    throw new CustomAuthError('No autorizado')
  }

  return session.user.id
}
