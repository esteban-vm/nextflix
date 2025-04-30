'use client'

import type { CldImageProps as DefaultCldImageProps } from 'next-cloudinary'
import { CldImage as DefaultCldImage } from 'next-cloudinary'

export function FullImage({ noBlur, ...rest }: FullImageProps) {
  return <DefaultCldImage {...rest} placeholder={noBlur ? 'empty' : 'blur'} fill />
}

export interface FullImageProps extends Omit<DefaultCldImageProps, 'placeholder' | 'fill'> {
  noBlur?: boolean
}
