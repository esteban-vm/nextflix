import { ProfileActions } from '@/actions'
import { ProfilesUI } from '@/components/pages'
import { verifySession } from '@/lib/auth'

export default async function ProfilesPage() {
  await verifySession()

  const profileResults = await ProfileActions.findAll()
  const profiles = profileResults?.data ?? []

  const total = profiles.length
  const remaining = 4 - total
  const displayProfileButton = total > 0
  const displayProfileForm = total < 4

  return (
    <ProfilesUI.PageContainer>
      <ProfilesUI.PageTitle>Elige tu perfil</ProfilesUI.PageTitle>
      <ProfilesUI.PageSubtitle>¿Quién eres?</ProfilesUI.PageSubtitle>
      <ProfilesUI.ProfileList>
        {profiles.map((profile) => (
          <ProfilesUI.ProfileCard key={profile.id} profile={profile} />
        ))}
        {displayProfileForm && <ProfilesUI.ProfileForm profiles={profiles} remaining={remaining} />}
      </ProfilesUI.ProfileList>
      {displayProfileButton && <ProfilesUI.ProfileButton />}
    </ProfilesUI.PageContainer>
  )
}
