import type { NavLinkProps } from '@/common'

export type ProfileImagePath = `/profiles/profile-${1 | 2 | 3 | 4}.png`

export const navLinks: NavLinkProps[] = [
  { name: 'Inicio', link: '/' },
  { name: 'Películas', link: '/' },
  { name: 'Series', link: '/' },
  { name: 'Mi lista', link: '/login' },
]

export const profileImages = (<const>[
  '/profiles/profile-1.png',
  '/profiles/profile-2.png',
  '/profiles/profile-3.png',
  '/profiles/profile-4.png',
]) satisfies ProfileImagePath[]
