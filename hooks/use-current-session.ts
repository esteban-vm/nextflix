/* eslint-disable react-hooks/exhaustive-deps */

import type { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'

/**
 * @see {@link https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-1901351841 | useSession only getting the session after manually reloading the page #9504}
 */

// This hook doesn't rely on the session provider
export const useCurrentSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<'authenticated' | 'loading' | 'unauthenticated'>('unauthenticated')
  const pathname = usePathname()

  const getCurrentSession = useCallback(async () => {
    try {
      setStatus('loading')
      const sessionData = await getSession()

      if (sessionData) {
        setSession(sessionData)
        setStatus('authenticated')
        return
      }

      setStatus('unauthenticated')
    } catch {
      setSession(null)
      setStatus('unauthenticated')
    }
  }, [])

  useEffect(() => {
    getCurrentSession()
    // use the pathname to force a re-render when the user navigates to a new page
  }, [pathname])

  return { session, status }
}
