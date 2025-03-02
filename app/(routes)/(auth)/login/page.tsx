import { AuthUI } from '@/components/pages'
import { Checkbox } from '@/components/ui'

export default function LoginPage() {
  return (
    <>
      <AuthUI.PageTitle>Iniciar sesión</AuthUI.PageTitle>
      <AuthUI.LoginForm />
      <AuthUI.FlexContainer $isCol>
        <AuthUI.FlexContainer>
          <AuthUI.CheckboxContainer>
            <Checkbox id='remember' />
            <AuthUI.CheckboxLabel htmlFor='remember'>&nbsp;Recordarme</AuthUI.CheckboxLabel>
          </AuthUI.CheckboxContainer>
          <AuthUI.PasswordLink href='/'>¿Has olvidado tu contraseña?</AuthUI.PasswordLink>
        </AuthUI.FlexContainer>
        <AuthUI.FlexContainer>
          <span>¿Aún no tienes una cuenta?</span>
          <AuthUI.AuthLink href='/register'>¡Suscríbete ahora!</AuthUI.AuthLink>
        </AuthUI.FlexContainer>
      </AuthUI.FlexContainer>
    </>
  )
}
