import { AuthUI } from '@/components/pages'
import { verifyNoSession } from '@/lib/auth'
import { movies } from '@/lib/images'

export default async function AuthLayout({ children }: WithChildren) {
  await verifyNoSession()

  return (
    <AuthUI.LayoutContainer>
      <AuthUI.BackgroundImage alt='Imagen de fondo' src={movies} fill />
      <AuthUI.PageContainer>
        {children}
        <AuthUI.TermsContainer>
          Esta página utiliza Google reCAPTCHA para verificar que no eres un robot&nbsp;
          <AuthUI.PrivacyTerms>
            La información recopilada por Google reCAPTCHA está sujeta a la política de privacidad y a las condiciones
            de servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así como
            para fines generales de seguridad (Google no la utiliza para publicidad personalizada).
          </AuthUI.PrivacyTerms>
        </AuthUI.TermsContainer>
      </AuthUI.PageContainer>
    </AuthUI.LayoutContainer>
  )
}
