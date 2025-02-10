import { AuthUI } from '@/components/pages'

export default function AuthLayout({ children }: WithChildren) {
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
