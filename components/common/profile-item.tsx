import type { Profile } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DeleteProfileDialog } from '@/dialogs'
import { useCurrentProfile, useProfileManagement } from '@/hooks'
import { avatarPaths } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function ProfileItem(profile: Profile) {
  const { avatar, name, id } = profile
  const { push } = useRouter()
  const { deleting } = useProfileManagement()
  const { change } = useCurrentProfile()

  const onChangeProfile = () => {
    if (!deleting) {
      change(profile)
      push('/')
    }
  }

  return (
    <div
      aria-hidden='true'
      className='group flex cursor-pointer select-none flex-col items-center justify-center gap-2 transition-all ~size-28/32'
      onClick={onChangeProfile}
    >
      <div className='relative size-3/4'>
        <Image
          alt={`${name} profile`}
          src={avatarPaths[avatar]}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            deleting ? 'blur-md' : 'group-hover:border-gray-500'
          )}
          fill
        />
        <div className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', !deleting && 'hidden')}>
          <DeleteProfileDialog id={id} />
        </div>
      </div>
      <span className='max-w-full truncate font-semibold uppercase text-gray-500 group-hover:opacity-90'>{name}</span>
    </div>
  )
}
