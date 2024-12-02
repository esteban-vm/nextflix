import type { Avatar } from '@prisma/client'
import Image from 'next/image'
import { DeleteProfileDialog } from '@/dialogs'
import { cn } from '@/lib/utils'

export function ProfileItem({ name, image, isEditing }: ProfileItemProps) {
  return (
    <div className='group flex cursor-pointer select-none flex-col items-center justify-center gap-2 transition-all ~size-28/32'>
      <div className='relative size-3/4'>
        <Image
          alt={`${name} profile`}
          src={`/avatars/${image}.png`}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            isEditing ? 'blur-md' : 'group-hover:border-gray-500'
          )}
          fill
        />
        <div className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', !isEditing && 'hidden')}>
          <DeleteProfileDialog />
        </div>
      </div>
      <span className='max-w-full truncate font-semibold uppercase text-gray-500 group-hover:opacity-90'>{name}</span>
    </div>
  )
}

export interface ProfileItemProps {
  name: string
  image: Avatar
  isEditing: boolean
}
