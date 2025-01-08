'use client'

import Image from 'next/image'
import { useProfileStore } from '@/hooks'
import { avatars } from '@/lib/constants'
import { DropdownMenuItem } from '@/ui'

export function NavItem(profile: Models.Profile) {
  const { avatar, name, id } = profile
  const { setProfile } = useProfileStore()

  return (
    <DropdownMenuItem className='w-52 cursor-pointer' id={id} onClick={() => setProfile(profile)}>
      <div className='relative aspect-square size-12 rounded-sm border-2 border-primary'>
        <Image alt={`Perfil de ${name}`} src={avatars[avatar]} fill />
      </div>
      <span className='truncate text-sm'>{name}</span>
    </DropdownMenuItem>
  )
}
