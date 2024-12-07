import type { ReactNode } from 'react'
import Image from 'next/image'
import { LuInfo } from 'react-icons/lu'
import movies from '@/images/backgrounds/movies-wp.jpg'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex size-full items-center justify-center'>
      <Image alt='login-bg' className='object-cover object-center opacity-30' src={movies} fill />
      <div className='z-20 flex max-w-[95%] flex-col justify-center rounded-xl bg-background/80 ~gap-1/2 ~px-5/9 ~py-6/10 sm:max-w-lg'>
        {children}
        <p className='text-center text-sm text-gray-600'>
          Esta página utiliza Google reCAPTCHA para verificar que no eres un robot&nbsp;
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LuInfo className='inline cursor-help stroke-gray-600' />
              </TooltipTrigger>
              <TooltipContent
                className='max-w-sm text-balance bg-background/90 text-sm text-gray-600 ~p-6/8'
                side='bottom'
              >
                La información recopilada por Google reCAPTCHA está sujeta a la política de privacidad y a las
                condiciones de servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de
                reCAPTCHA, así como para fines generales de seguridad (Google no la utiliza para publicidad
                personalizada).
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      </div>
    </div>
  )
}
