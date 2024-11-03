import type { ReactNode } from 'react'
import Image from 'next/image'
import { Logo } from '@/components/shared'
import loginBg from '@/images/login-bg.jpg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative size-full'>
      <Image alt='login-bg' className='object-cover object-center opacity-40' src={loginBg} fill />
      <div className='absolute left-1/2 w-full max-w-screen-2xl -translate-x-1/2 p-4 2xl:px-0'>
        <Logo />
        <div className='mx-auto max-w-md text-center'>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
