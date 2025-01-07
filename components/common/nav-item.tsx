import type { Profile } from '@prisma/client'
import Image from 'next/image'
import { useProfileStore } from '@/hooks'
import { avatarPaths } from '@/lib/constants'
import { DropdownMenuItem } from '@/ui'

export function NavItem(profile: Profile) {
  const { avatar, name, id } = profile
  const { setProfile } = useProfileStore()

  return (
    <DropdownMenuItem className='w-52 cursor-pointer' id={id} onClick={() => setProfile(profile)}>
      <div className='relative aspect-square size-12 rounded-sm border-2 border-primary'>
        <Image alt={`${name}'s profile`} src={avatarPaths[avatar]} fill />
      </div>
      <span className='truncate text-sm'>{name}</span>
    </DropdownMenuItem>
  )
}