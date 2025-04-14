import type { Route } from 'next'
import Link from 'next/link'
import { useUIStore } from '@/hooks'

export function NavLink({ name, ...rest }: NavLinkProps) {
  const { setIsMobileNavigationOpen } = useUIStore()

  return (
    <Link
      {...rest}
      className='capitalize transition-all duration-300 hover:text-foreground/80'
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
