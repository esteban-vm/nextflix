import type { ImageProps } from 'next/image'
import Image from 'next/image'

export function FullImage(props: FullImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} placeholder='blur' fill />
}

export type FullImageProps = Omit<ImageProps, 'placeholder' | 'fill'>
