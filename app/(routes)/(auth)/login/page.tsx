import { AuthUI } from '@/components/pages'
import { getUserEmail } from '@/lib/auth'

export default async function LoginPage() {
  const userEmail = await getUserEmail()

  return (
    <>
      <p>Session: {userEmail}</p>
      <AuthUI.PageTitle>Iniciar sesión</AuthUI.PageTitle>
      <AuthUI.LoginForm />
      <div className='w-full'>
        <AuthUI.RememberCheck />
        <AuthUI.RegisterLink />
      </div>
    </>
  )
}
