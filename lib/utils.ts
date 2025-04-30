import type { ClassValue } from 'clsx'
import { withFluid } from '@fluid-tailwind/tailwind-merge'
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge(withFluid)

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

export function randomize() {
  return Math.floor(Math.random() * 5)
}
