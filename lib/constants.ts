import type { NavLinkProps } from '@/components/navigation/atoms'

export type AvatarUrl = `/images/avatars/avatar${1 | 2 | 3 | 4}.webp`

export const avatarUrls = (<const>[
  '/images/avatars/avatar1.webp',
  '/images/avatars/avatar2.webp',
  '/images/avatars/avatar3.webp',
  '/images/avatars/avatar4.webp',
]) satisfies AvatarUrl[]

export const navLinks: NavLinkProps[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Películas', href: '/' },
  { name: 'Series', href: '/profiles' },
  { name: 'Mi lista', href: '/login' },
]

export const rankingPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACaCAQAAACUawf0AAAAfElEQVR42u3OMQEAAAgDoK1/GxMaQw9IQDN5rYKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCdxYTjmuvxCQergAAAABJRU5ErkJggg=='
