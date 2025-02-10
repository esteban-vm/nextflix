import { AuthUI } from '@/components/pages'

export default function RegisterPage() {
  return (
    <>
      <AuthUI.PageTitle>Registro de usuario</AuthUI.PageTitle>
      <AuthUI.RegisterForm />
      <AuthUI.LoginLink />
    </>
  )
}
