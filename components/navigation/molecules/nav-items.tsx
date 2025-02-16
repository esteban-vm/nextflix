import Image from 'next/image'
import { DropdownMenuItem } from '@/components/ui'
import { useCurrentSession, useProfileStore } from '@/hooks'
import { avatars } from '@/lib/constants'

export function ImageItem({ profile }: WithProfile) {
  const { avatar, name, id } = profile
  const { setCurrentProfile } = useProfileStore()

  return (
    <DropdownMenuItem className='w-52 cursor-pointer' id={id} onClick={() => setCurrentProfile(profile)}>
      <div className='relative aspect-square size-12 rounded-sm border-2 border-primary'>
        <Image alt={`Perfil de ${name}`} src={avatars[avatar]} fill />
      </div>
      <span className='truncate text-sm'>{name}</span>
    </DropdownMenuItem>
  )
}

export function InfoItem() {
  const { session } = useCurrentSession()
  const userEmail = session?.user.email

  return <DropdownMenuItem>{userEmail}</DropdownMenuItem>
}
