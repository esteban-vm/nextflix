import { PrivacyTermsUI } from '@/components/pages/auth/styled'
import { Tooltip, TooltipTrigger } from '@/components/ui'

export function PrivacyTerms({ children }: Props.WithChildren) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <PrivacyTermsUI.IconQuestion />
      </TooltipTrigger>
      <PrivacyTermsUI.PrivacyContent>{children}</PrivacyTermsUI.PrivacyContent>
    </Tooltip>
  )
}
