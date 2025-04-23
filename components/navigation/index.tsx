'use client'

import type { CurrentSession } from '@/hooks'
import { useCallback, useEffect } from 'react'
import { DesktopNav, MobileNav } from '@/components/navigation/templates'
import { useCurrentSession } from '@/hooks'

export function Navigation({ currentSession }: NavigationProps) {
  const { setCurrentSession } = useCurrentSession()

  const getCurrentSession = useCallback(() => {
    setCurrentSession(currentSession)
  }, [currentSession, setCurrentSession])

  useEffect(() => {
    getCurrentSession()
  }, [getCurrentSession])

  return (
    <nav className='fixed inset-x-0 top-0 z-30 w-full transition-all duration-300'>
      <MobileNav />
      <DesktopNav />
    </nav>
  )
}

export interface NavigationProps {
  currentSession: CurrentSession
}
