import { AuthUI } from '@/components/pages'
import { FullImage } from '@/components/pages/common'
import moviesWP from '@/images/backgrounds/movies-wp.jpg'
import { verifyNoSession } from '@/lib/auth'

export default async function AuthLayout({ children }: Props.WithChildren) {
  await verifyNoSession()

  return (
    <AuthUI.LayoutContainer>
      <FullImage alt='Imagen de fondo' className='object-cover object-center opacity-30' src={moviesWP} />
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
