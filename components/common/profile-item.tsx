import type { Profile } from '@prisma/client'
import Image from 'next/image'
import { DeleteProfileDialog } from '@/dialogs'
import { useProfileContext } from '@/hooks'
import { cn } from '@/lib/utils'

export function ProfileItem({ avatar, name, ...rest }: Profile) {
  const { isDeleting } = useProfileContext()

  return (
    <div className='group flex cursor-pointer select-none flex-col items-center justify-center gap-2 transition-all ~size-28/32'>
      <div className='relative size-3/4'>
        <Image
          alt={`${name} profile`}
          src={`/avatars/${avatar}.png`}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            isDeleting ? 'blur-md' : 'group-hover:border-gray-500'
          )}
          fill
        />
        <div className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', !isDeleting && 'hidden')}>
          <DeleteProfileDialog {...rest} />
        </div>
      </div>
      <span className='max-w-full truncate font-semibold uppercase text-gray-500 group-hover:opacity-90'>{name}</span>
    </div>
  )
}
