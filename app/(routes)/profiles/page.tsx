import { ProfileActions } from '@/actions'
import { ProfileButton, ProfileCard, ProfileForm } from '@/components/pages'
import { ProfilesUI as UI } from '@/components/styled'
import { verifySession } from '@/lib/auth'

export default async function ProfilesPage() {
  await verifySession()

  const profileResults = await ProfileActions.findAll()
  const profiles = profileResults?.data ?? []

  const total = profiles.length
  const remaining = 4 - total
  const displayProfileForm = total < 4
  const displayProfileButton = total > 0

  return (
    <UI.Page.PageContainer>
      <UI.Page.PageTitle>Elige tu perfil</UI.Page.PageTitle>
      <UI.Page.PageSubtitle>¿Quién eres?</UI.Page.PageSubtitle>
      <UI.Page.ProfileList>
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {displayProfileForm && <ProfileForm remaining={remaining} />}
      </UI.Page.ProfileList>
      {displayProfileButton && <ProfileButton />}
    </UI.Page.PageContainer>
  )
}
