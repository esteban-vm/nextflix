import type { NavLinkProps } from '@/common'
import type { Avatar } from '@prisma/client'
import localFont from 'next/font/local'

export type AvatarPaths = Record<Avatar, `/images/avatars/${Avatar}.png`>

export const avatars: AvatarPaths = {
  avatar1: '/images/avatars/avatar1.png',
  avatar2: '/images/avatars/avatar2.png',
  avatar3: '/images/avatars/avatar3.png',
  avatar4: '/images/avatars/avatar4.png',
}

export const geistMono = localFont({
  src: '../public/fonts/geist-mono.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const geistSans = localFont({
  src: '../public/fonts/geist-sans.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const navLinks: NavLinkProps[] = [
  { name: 'Inicio', link: '/' },
  { name: 'Películas', link: '/' },
  { name: 'Series', link: '/profiles' },
  { name: 'Mi lista', link: '/login' },
]
