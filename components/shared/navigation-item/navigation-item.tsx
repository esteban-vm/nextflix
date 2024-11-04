import type { Route } from 'next'
import Link from 'next/link'

export function NavigationItem({ name, link }: NavigationItemProps) {
  return (
    <Link key={name} className='capitalize transition-all duration-300 hover:text-foreground/80' href={link}>
      {name}
    </Link>
  )
}

export interface NavigationItemProps {
  name: string
  link: Route
}
