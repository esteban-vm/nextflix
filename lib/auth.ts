import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { CustomAuthError } from '@/lib/errors'

export const checkUserSession = async () => {
  const session = await auth()
  if (!session?.user) redirect('/login')
}

export const getUserEmail = async () => {
  const session = await auth()
  return session?.user?.email ?? 'no session'
}

export const getUserId = async () => {
  const session = await auth()
  if (!session?.user.id) throw new CustomAuthError('No autorizado')
  return session.user.id
}
