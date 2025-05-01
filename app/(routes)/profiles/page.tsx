import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProfileActions } from '@/actions'
import { ProfileButton, ProfileCard, ProfileForm } from '@/components/pages'
import { ProfilesUI as UI } from '@/components/styled'
import { verifySession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Mis perfiles',
}

export default async function ProfilesPage() {
  await verifySession()

  const profilesResult = await ProfileActions.findAll()
  const profilesData = profilesResult?.data

  if (!profilesData) notFound()

  const total = profilesData.length
  const remaining = 4 - total
  const shouldDisplayForm = total < 4
  const shouldDisplayButton = total > 0

  return (
    <UI.Page.PageContainer>
      <UI.Page.PageTitle>¿Quién eres?</UI.Page.PageTitle>
      <UI.Page.PageSubtitle>Elige tu perfil</UI.Page.PageSubtitle>
      <UI.Page.ProfileList>
        {profilesData.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {shouldDisplayForm && <ProfileForm remaining={remaining} />}
      </UI.Page.ProfileList>
      {shouldDisplayButton && <ProfileButton />}
    </UI.Page.PageContainer>
  )
}
