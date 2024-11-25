import Link from 'next/link'
import { RegisterForm } from '@/forms'

export default function RegisterPage() {
  return (
    <>
      <h2 className='font-semibold ~text-xl/2xl'>Registro de usuario</h2>
      <RegisterForm />
      <div className='flex w-full justify-between'>
        <span>¿Ya tienes una cuenta?</span>
        <Link className='font-semibold text-rose-700 hover:underline hover:opacity-90' href='/login'>
          Ingresar
        </Link>
      </div>
    </>
  )
}
