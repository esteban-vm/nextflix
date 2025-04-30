import type { NavLinkProps } from '@/components/navigation/atoms'

export type AvatarUrl = `/images/avatars/avatar${1 | 2 | 3 | 4}.webp`

export const appName = 'Nextflix'
export const authorName = 'Esteban V.M.'

export const avatarUrls = (<const>[
  'nextflix/avatars/avatar1',
  'nextflix/avatars/avatar2',
  'nextflix/avatars/avatar3',
  'nextflix/avatars/avatar4',
]) satisfies AvatarUrl[]

export const contentType = 'image/png'

export const navLinks: NavLinkProps[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Mis perfiles', href: '/profiles' },
]

export const size = <const>{
  width: 32,
  height: 32,
}

export const thumbnailUrls = (<const>[
  'nextflix/thumbnails/thumbnail1',
  'nextflix/thumbnails/thumbnail2',
  'nextflix/thumbnails/thumbnail3',
  'nextflix/thumbnails/thumbnail4',
  'nextflix/thumbnails/thumbnail5',
]) satisfies ThumbnailUrl[]
