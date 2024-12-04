import { ProfileItem } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { useProfileContext } from '@/hooks'
import { Button } from '@/ui'

export function ProfileManager() {
  const { profiles, isDeleting, setIsDeleting } = useProfileContext()

  return (
    <>
      <div className='flex flex-wrap items-center justify-center ~gap-3/5'>
        {profiles.map((profile) => (
          <ProfileItem key={profile.id} {...profile} />
        ))}
        <AddProfileDialog />
      </div>
      {!!profiles.length && (
        <Button size='lg' variant='outline' onClick={() => setIsDeleting(!isDeleting)}>
          Administrar perfiles
        </Button>
      )}
    </>
  )
}
