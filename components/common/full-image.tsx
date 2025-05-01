'use client'

import type { CldImageProps } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'

export function FullImage({ noBlur, ...rest }: FullImageProps) {
  return <CldImage {...rest} placeholder={noBlur ? 'empty' : 'blur'} fill />
}

export interface FullImageProps extends Omit<CldImageProps, 'placeholder' | 'fill'> {
  noBlur?: boolean
}
