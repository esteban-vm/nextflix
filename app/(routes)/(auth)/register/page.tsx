import { RegisterForm } from '@/components/pages'
import { AuthUI as UI } from '@/components/styled'

export default function RegisterPage() {
  return (
    <>
      <UI.Layout.PageTitle>Registro de usuario</UI.Layout.PageTitle>
      <RegisterForm />
      <UI.Layout.FlexContainer>
        <span>¿Ya tienes una cuenta?</span>
        <UI.Layout.AuthLink href='/login'>Ingresar</UI.Layout.AuthLink>
      </UI.Layout.FlexContainer>
    </>
  )
}
