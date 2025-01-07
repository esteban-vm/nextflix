import type { Route } from 'next'
import Link from 'next/link'

export function NavLink({ name, link, onClose }: NavLinkProps) {
  return (
    <Link className='capitalize transition-all duration-300 hover:text-foreground/80' href={link} onClick={onClose}>
      {name}
    </Link>
  )
}

export interface NavLinkProps {
  name: string
  link: Route
  onClose?: () => void
}
