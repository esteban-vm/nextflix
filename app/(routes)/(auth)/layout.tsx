import Image from 'next/image'
import { AuthTerms } from '@/common'
import movies from '@/images/backgrounds/movies-wp.jpg'

export default function AuthLayout({ children }: WithChildren) {
  return (
    <div className='relative flex size-full items-center justify-center'>
      <Image alt='login-bg' className='object-cover object-center opacity-30' src={movies} fill />
      <div className='z-20 flex max-w-[95%] flex-col justify-center rounded-xl bg-background/80 ~gap-1/2 ~px-5/9 ~py-6/10 sm:max-w-lg'>
        {children}
        <AuthTerms />
      </div>
    </div>
  )
}
