import Link from 'next/link'
import { AuthTerms } from '@/(auth)/components'
import { LoginForm } from '@/(auth)/login/components'
import { Checkbox } from '@/components/ui'

export default function LoginPage() {
  return (
    <>
      <h2 className='font-semibold ~text-xl/2xl'>Iniciar sesión</h2>
      <LoginForm />
      <div className='w-full'>
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
        <div className='flex justify-between'>
          <span>¿Aún no tienes una cuenta?</span>
          <Link className='font-semibold text-rose-700 hover:underline hover:opacity-90' href='/register'>
            ¡Suscríbete ahora!
          </Link>
        </div>
      </div>
      <AuthTerms />
    </>
  )
}
