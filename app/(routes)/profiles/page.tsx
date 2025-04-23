import type { Metadata } from 'next'
import { ProfileActions } from '@/actions'
import { ProfileButton, ProfileCard, ProfileForm } from '@/components/pages'
import { Profiles as UI } from '@/components/styled'
import { verifySession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Mis perfiles',
}

export default async function ProfilesPage() {
  await verifySession()

  const profileResults = await ProfileActions.findAll()
  const profiles = profileResults?.data

  if (!profiles) return null

  const total = profiles.length
  const remaining = 4 - total
  const shouldDisplayForm = total < 4
  const shouldDisplayButton = total > 0

  return (
    <UI.Page.PageContainer>
      <UI.Page.PageTitle>¿Quién eres?</UI.Page.PageTitle>
      <UI.Page.PageSubtitle>Elige tu perfil</UI.Page.PageSubtitle>
      <UI.Page.ProfileList>
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {shouldDisplayForm && <ProfileForm remaining={remaining} />}
      </UI.Page.ProfileList>
      {shouldDisplayButton && <ProfileButton />}
    </UI.Page.PageContainer>
  )
}
