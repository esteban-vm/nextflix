import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { CustomAuthError } from '@/lib/errors'

export const getSession = async () => {
  const session = await auth()

  if (!session?.user) {
    throw new CustomAuthError('No autorizado')
  }

  return session
}

export const verifyNoSession = async () => {
  const session = await auth()
  if (session?.user) redirect('/')
}

export const verifySession = async () => {
  const session = await auth()
  if (!session?.user) redirect('/login')
}
