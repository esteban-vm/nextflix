import type { Route } from 'next'
import Link from 'next/link'
import { useMobileNav } from '@/hooks'

export function NavLink({ name, ...rest }: NavLinkProps) {
  const { close } = useMobileNav()

  return (
    <Link {...rest} className='capitalize transition-all duration-300 hover:text-foreground/80' onClick={close}>
      {name}
    </Link>
  )
}

export interface NavLinkProps {
  name: string
  href: Route
}
