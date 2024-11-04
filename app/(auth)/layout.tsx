import type { ReactNode } from 'react'
import Image from 'next/image'
import loginBg from '@/images/login-bg.jpg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='relative size-full'>
        <Image alt='login-bg' className='object-cover object-center opacity-30' src={loginBg} fill />
      </div>
      <div className='absolute left-1/2 top-1/2 w-full max-w-screen-2xl -translate-x-1/2 -translate-y-1/2'>
        <div className='mx-auto max-w-md text-center'>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}
