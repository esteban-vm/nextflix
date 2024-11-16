'use client'

import { signOut } from 'next-auth/react'
import { LuBellRing, LuLogOut, LuSearch, LuUser } from 'react-icons/lu'
import { useScrollPosition } from '@/hooks'
import { navigationItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Logo } from '@/shared/logo'
import { NavigationItem } from '@/shared/navigation-item'

export function Desktop() {
  const { scrollPosition } = useScrollPosition()

  return (
    <div className={cn('hidden py-4 md:block', scrollPosition > 20 ? 'bg-black' : 'bg-transparent')}>
      <div className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 2xl:px-0'>
        <div className='flex items-center gap-4'>
          <Logo />
          <div />
          {navigationItems.map((link) => (
            <NavigationItem key={link.name} {...link} />
          ))}
        </div>
        <div className='flex gap-2 [&_svg]:cursor-pointer [&_svg]:~size-5/6'>
          <LuSearch title='Búsqueda' />
          <LuBellRing title='Notificaciones' />
          <LuUser title='Perfil' />
          <LuLogOut title='Cerrar sesión' onClick={() => signOut({ redirectTo: '/' })} />
        </div>
      </div>
    </div>
  )
}
