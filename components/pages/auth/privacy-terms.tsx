import { Auth as UI } from '@/components/styled'
import { Tooltip, TooltipTrigger } from '@/components/ui'

export function PrivacyTerms({ children }: Props.WithChildren) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <UI.PrivacyTerms.IconQuestion />
      </TooltipTrigger>
      <UI.PrivacyTerms.PrivacyContent>{children}</UI.PrivacyTerms.PrivacyContent>
    </Tooltip>
  )
}
