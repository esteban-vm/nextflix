import Image from 'next/image'
import Link from 'next/link'
import { Checkbox } from '@/components/ui'
import movies from '@/images/backgrounds/movies-wp.jpg'

export function BackgroundImage() {
  return <Image alt='auth background' className='object-cover object-center opacity-30' src={movies} fill />
}

export function InnerWrapper({ children }: WithChildren) {
  return (
    <div className='z-20 flex max-w-[95%] flex-col justify-center rounded-xl bg-background/80 ~gap-1/2 ~px-5/9 ~py-6/10 sm:max-w-lg'>
      {children}
    </div>
  )
}

export function LoginLink() {
  return (
    <div className='flex w-full justify-between'>
      <span>¿Ya tienes una cuenta?</span>
      <Link className='font-semibold text-rose-700 hover:underline hover:opacity-90' href='/login'>
        Ingresar
      </Link>
    </div>
  )
}

export function PageTitle({ children }: WithChildren) {
  return <h2 className='font-semibold ~text-xl/2xl'>{children}</h2>
}

export function PageWrapper({ children }: WithChildren) {
  return <div className='relative flex size-full items-center justify-center'>{children}</div>
}

export function RegisterLink() {
  return (
    <div className='flex justify-between'>
      <span>¿Aún no tienes una cuenta?</span>
      <Link className='font-semibold text-rose-700 hover:underline hover:opacity-90' href='/register'>
        ¡Suscríbete ahora!
      </Link>
    </div>
  )
}

export function RememberCheck() {
  return (
    <div className='flex justify-between'>
      <span className='flex w-fit items-center justify-center hover:opacity-90'>
        <Checkbox id='remember' />
        <label
          className='cursor-pointer select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          htmlFor='remember'
        >
          &nbsp;Recordarme
        </label>
      </span>
      <Link className='font-semibold text-sky-700 hover:underline hover:opacity-90' href='/'>
        ¿Has olvidado tu contraseña?
      </Link>
    </div>
  )
}
