import Link from 'next/link'
import { LoginForm, LoginTerms } from '@/(auth)/login/components'
import { Checkbox } from '@/components/ui'

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center gap-2'>
      <h2 className='font-semibold ~text-xl/2xl'>Iniciar sesión</h2>
      <LoginForm />
      <div className='w-full'>
        <div className='flex justify-between'>
          <span className='flex w-fit items-center justify-center hover:opacity-90'>
            <Checkbox className='~size-3/4' id='remember' />
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
        <div className='flex justify-between'>
          <span>¿Aún no tienes una cuenta?</span>
          <Link className='font-semibold text-rose-700 hover:underline hover:opacity-90' href='/'>
            ¡Suscribirte ahora!
          </Link>
        </div>
      </div>
      <LoginTerms />
    </div>
  )
}
