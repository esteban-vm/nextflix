import type { Route } from 'next'
import type { LinkProps } from 'next/link'
import Link from 'next/link'

export function NavLink<R extends Route>({ name, ...rest }: NavLinkProps<R>) {
  return (
    <Link {...rest} className='capitalize transition-all duration-300 hover:text-foreground/80'>
      {name}
    </Link>
  )
}

export interface NavLinkProps<R = string> extends Omit<LinkProps<R>, 'className'> {
  name: string
}
