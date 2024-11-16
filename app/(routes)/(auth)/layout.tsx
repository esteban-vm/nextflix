import type { ReactNode } from 'react'
import { AuthTerms, BgImage } from '@/(auth)/components'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex size-full items-center justify-center'>
      <BgImage />
      <div className='z-20 flex max-w-[95%] flex-col justify-center rounded-xl bg-background/80 ~gap-1/2 ~px-5/9 ~py-6/10 sm:max-w-lg'>
        {children}
        <AuthTerms />
      </div>
    </div>
  )
}
