/* eslint-disable react-hooks/exhaustive-deps */

import type { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'

type CurrentSession = Utils.Nullable<Session>
type SessionStatus = 'unauthenticated' | 'loading' | 'authenticated'

/**
 * @see {@link https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-1901351841 | useSession only getting the session after manually reloading the page #9504}
 */

export const useCurrentSession = () => {
  const [session, setSession] = useState<CurrentSession>(null)
  const [status, setStatus] = useState<SessionStatus>('unauthenticated')
  const pathname = usePathname()

  const getCurrentSession = useCallback(async () => {
    try {
      setStatus('loading')
      const sessionData = await getSession()

      if (sessionData) {
        setStatus('authenticated')
        setSession(sessionData)
      }
    } catch {
      setStatus('unauthenticated')
      setSession(null)
    }
  }, [])

  useEffect(() => {
    getCurrentSession()
    // use the pathname to force a re-render when the user navigates to a new page
  }, [pathname])

  return { session, status }
}
