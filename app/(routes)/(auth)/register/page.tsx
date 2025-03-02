import { AuthUI } from '@/components/pages'

export default function RegisterPage() {
  return (
    <>
      <AuthUI.PageTitle>Registro de usuario</AuthUI.PageTitle>
      <AuthUI.RegisterForm />
      <AuthUI.FlexContainer>
        <span>¿Ya tienes una cuenta?</span>
        <AuthUI.AuthLink href='/login'>Ingresar</AuthUI.AuthLink>
      </AuthUI.FlexContainer>
    </>
  )
}
