'use client'

import { DesktopNav, MobileNav } from '@/components/navigation/templates'

export function Navigation() {
  return (
    <nav className='fixed inset-x-0 top-0 z-30 w-full transition-all duration-300'>
      <MobileNav />
      <DesktopNav />
    </nav>
  )
}
