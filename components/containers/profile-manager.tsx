import { ProfileItem } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { useProfileStore } from '@/hooks'
import { Button } from '@/ui'

export function ProfileManager({ profiles = [] }: ProfileManagerProps) {
  const { toggle } = useProfileStore()

  const total = profiles.length
  const remaining = 4 - total
  const shouldDisplayDialog = total < 4
  const shouldDisplayButton = total > 0

  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
        {profiles.map((profile) => (
          <ProfileItem key={profile.id} {...profile} />
        ))}
        {shouldDisplayDialog && <AddProfileDialog profiles={profiles} remaining={remaining} />}
      </div>
      {shouldDisplayButton && (
        <Button size='lg' variant='outline' onClick={() => toggle('isDeleting')}>
          Administrar perfiles
        </Button>
      )}
    </>
  )
}

export interface ProfileManagerProps {
  profiles?: Models.Profile[]
}
