'use server'

import { getCldImageUrl } from 'next-cloudinary'

export async function getPlaceholderImage(src: string) {
  const imageUrl = getCldImageUrl({ src })
  const response = await fetch(imageUrl)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')
  const image = `data:${response.type};base64,${base64}`
  return image
}
