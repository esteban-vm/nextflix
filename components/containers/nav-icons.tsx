import { signOut } from 'next-auth/react'
import { LuBellRing, LuLogOut, LuSearch, LuUser } from 'react-icons/lu'
import { useCurrentSession } from '@/hooks'

export function NavIcons() {
  const { status } = useCurrentSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <LuSearch title='Búsqueda' />
      {isAuthenticated && (
        <>
          <LuBellRing title='Notificaciones' />
          <LuUser title='Perfil' />
          <LuLogOut title='Cerrar sesión' onClick={() => signOut({ redirectTo: '/' })} />
        </>
      )}
    </>
  )
}
