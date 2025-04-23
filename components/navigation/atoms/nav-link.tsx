import type { Route } from 'next'
import Link from 'next/link'
import { useUIStore } from '@/hooks'

export function NavLink({ name, ...rest }: NavLinkProps) {
  const { setIsMobileNavigationOpen } = useUIStore()

  return (
    <Link
      {...rest}
      className='uppercase decoration-rose-500 decoration-4 underline-offset-2 transition-all duration-300 active:scale-95 hover:underline'
      onClick={() => setIsMobileNavigationOpen(false)}
    >
      {name}
    </Link>
  )
}

export interface NavLinkProps {
  name: string
  href: Route
}
