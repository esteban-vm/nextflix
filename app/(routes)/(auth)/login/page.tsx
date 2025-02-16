import { AuthUI } from '@/components/pages'

export default function LoginPage() {
  return (
    <>
      <AuthUI.PageTitle>Iniciar sesión</AuthUI.PageTitle>
      <AuthUI.LoginForm />
      <div className='w-full'>
        <AuthUI.RememberCheck />
        <AuthUI.RegisterLink />
      </div>
    </>
  )
}
