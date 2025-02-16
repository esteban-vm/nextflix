import { AuthUI } from '@/components/pages'
import { verifyNoSession } from '@/lib/auth'

export default async function AuthLayout({ children }: WithChildren) {
  await verifyNoSession()

  return (
    <AuthUI.PageWrapper>
      <AuthUI.BackgroundImage />
      <AuthUI.InnerWrapper>
        {children}
        <AuthUI.AuthTerms />
      </AuthUI.InnerWrapper>
    </AuthUI.PageWrapper>
  )
}
