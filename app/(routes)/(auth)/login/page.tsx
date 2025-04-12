import { LoginForm } from '@/components/pages'
import { Auth as UI } from '@/components/styled'
import { Checkbox } from '@/components/ui'

export default function LoginPage() {
  return (
    <>
      <UI.Layout.PageTitle>Iniciar sesión</UI.Layout.PageTitle>
      <LoginForm />
      <UI.Layout.FlexContainer $isCol>
        <UI.Layout.FlexContainer>
          <UI.Layout.CheckboxContainer>
            <Checkbox id='remember' />
            <UI.Layout.CheckboxLabel htmlFor='remember'>&nbsp;Recordarme</UI.Layout.CheckboxLabel>
          </UI.Layout.CheckboxContainer>
          <UI.Layout.PasswordLink href='/'>¿Has olvidado tu contraseña?</UI.Layout.PasswordLink>
        </UI.Layout.FlexContainer>
        <UI.Layout.FlexContainer>
          <span>¿Aún no tienes una cuenta?</span>
          <UI.Layout.AuthLink href='/register'>¡Suscríbete ahora!</UI.Layout.AuthLink>
        </UI.Layout.FlexContainer>
      </UI.Layout.FlexContainer>
    </>
  )
}
