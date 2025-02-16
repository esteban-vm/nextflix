import type { NavLinkProps } from '@/components/navigation/atoms'
import type { Avatar, Ranking } from '@prisma/client'
import localFont from 'next/font/local'

export type AvatarPaths = Record<Avatar, `/images/avatars/${Avatar}.png`>
export type RankingPaths = Record<Ranking, `/images/rankings/${Ranking}.png`>

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
  { name: 'Inicio', href: '/' },
  { name: 'Películas', href: '/' },
  { name: 'Series', href: '/profiles' },
  { name: 'Mi lista', href: '/login' },
]

export const rankings: RankingPaths = {
  ranking1: '/images/rankings/ranking1.png',
  ranking2: '/images/rankings/ranking2.png',
  ranking3: '/images/rankings/ranking3.png',
  ranking4: '/images/rankings/ranking4.png',
  ranking5: '/images/rankings/ranking5.png',
}
