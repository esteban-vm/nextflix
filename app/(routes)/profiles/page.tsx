import { ProfileActions } from '@/actions'
import { ProfilesUI } from '@/components/pages'
import { verifySession } from '@/lib/auth'

export default async function ProfilesPage() {
  await verifySession()

  const results = await ProfileActions.findAll()
  const profiles = results?.data ?? []

  const total = profiles.length
  const remaining = 4 - total
  const displayManageButton = total > 0
  const displayProfileDialog = total < 4

  return (
    <ProfilesUI.PageWrapper>
      <ProfilesUI.PageTitle>Elige tu perfil</ProfilesUI.PageTitle>
      <ProfilesUI.PageSubtitle>¿Quién eres?</ProfilesUI.PageSubtitle>
      <ProfilesUI.InnerWrapper>
        {profiles.map((profile) => (
          <ProfilesUI.ProfileCard key={profile.id} profile={profile}>
            <ProfilesUI.AvatarImage profile={profile} />
          </ProfilesUI.ProfileCard>
        ))}
        {displayProfileDialog && (
          <ProfilesUI.ProfileDialog remaining={remaining}>
            <ProfilesUI.ProfileForm profiles={profiles} />
          </ProfilesUI.ProfileDialog>
        )}
      </ProfilesUI.InnerWrapper>
      {displayManageButton && <ProfilesUI.ManageButton />}
    </ProfilesUI.PageWrapper>
  )
}
