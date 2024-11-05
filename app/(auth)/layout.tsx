import type { ReactNode } from 'react'
import Image from 'next/image'
import loginBg from '@/images/login-bg.jpg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='relative size-full'>
        <Image alt='login-bg' className='object-cover object-center opacity-30' src={loginBg} fill />
      </div>
      <div className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2'>
        <div className='mx-auto max-w-[90%] rounded-xl bg-background/80 ~px-10/12 ~py-12/14 sm:max-w-lg'>
          {children}
        </div>
      </div>
    </>
  )
}
