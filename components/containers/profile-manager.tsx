import type { Profile } from '@prisma/client'
import { ProfileItem } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { useProfileManagement } from '@/hooks'
import { Button } from '@/ui'

export function ProfileManager({ profiles = [] }: ProfileManagerProps) {
  const { toggle } = useProfileManagement()

  const shouldDisplayDialog = profiles.length < 5
  const shouldDisplayButton = !!profiles.length

  return (
    <>
      <div className='flex flex-wrap items-center justify-center ~gap-3/5'>
        {profiles.map((profile) => (
          <ProfileItem key={profile.id} {...profile} />
        ))}
        {shouldDisplayDialog && <AddProfileDialog />}
      </div>
      {shouldDisplayButton && (
        <Button size='lg' variant='outline' onClick={() => toggle('deleting')}>
          Administrar perfiles
        </Button>
      )}
    </>
  )
}

export interface ProfileManagerProps {
  profiles?: Profile[]
}
