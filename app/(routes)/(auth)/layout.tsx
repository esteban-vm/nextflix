import { FullImage } from '@/components/common'
import { PrivacyTerms } from '@/components/pages'
import { Auth as UI } from '@/components/styled'
import moviesWP from '@/images/backgrounds/movies-wp.jpg'
import { verifyNoSession } from '@/lib/auth'

export default async function AuthLayout({ children }: Props.WithChildren) {
  await verifyNoSession()

  return (
    <UI.Layout.LayoutContainer>
      <FullImage alt='Imagen de fondo' className='object-cover object-center opacity-30' src={moviesWP} />
      <UI.Layout.PageContainer>
        {children}
        <UI.Layout.TermsContainer>
          Esta página utiliza Google reCAPTCHA para verificar que no eres un robot&nbsp;
          <PrivacyTerms>
            La información recopilada por Google reCAPTCHA está sujeta a la política de privacidad y a las condiciones
            de servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así como
            para fines generales de seguridad (Google no la utiliza para publicidad personalizada).
          </PrivacyTerms>
        </UI.Layout.TermsContainer>
      </UI.Layout.PageContainer>
    </UI.Layout.LayoutContainer>
  )
}
