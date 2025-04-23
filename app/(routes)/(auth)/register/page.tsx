import type { Metadata } from 'next'
import { RegisterForm } from '@/components/pages'
import { Auth as UI } from '@/components/styled'

export const metadata: Metadata = {
  title: 'Registro de usuario',
}

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
