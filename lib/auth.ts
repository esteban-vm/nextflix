import type { Route } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export const verifyNoSession = async () => {
  const session = await auth()
  if (session?.user) redirect('/' satisfies Route)
}

export const verifySession = async () => {
  const session = await auth()
  if (!session?.user) redirect('/login' satisfies Route)
}
