import type { Profile } from '@prisma/client'
import { ProfileItem } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { useProfileStore } from '@/hooks'
import { Button } from '@/ui'

export function ProfileManager({ profiles = [] }: ProfileManagerProps) {
  const { toggleAction } = useProfileStore()

  const total = profiles.length
  const shouldDisplayDialog = total < 5
  const shouldDisplayButton = total > 0

  return (
    <>
      <div className='flex flex-wrap items-center justify-center ~gap-3/5'>
        {profiles.map((profile) => (
          <ProfileItem key={profile.id} {...profile} />
        ))}
        {shouldDisplayDialog && <AddProfileDialog remaining={5 - total} />}
      </div>
      {shouldDisplayButton && (
        <Button size='lg' variant='outline' onClick={() => toggleAction('isDeleting')}>
          Administrar perfiles
        </Button>
      )}
    </>
  )
}

export interface ProfileManagerProps {
  profiles?: Profile[]
}
