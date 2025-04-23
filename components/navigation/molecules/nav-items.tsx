import Image from 'next/image'
import { DropdownMenuItem } from '@/components/ui'
import { useCurrentProfile, useCurrentSession } from '@/hooks'

export function ImageItem({ profile }: ImageItemProps) {
  const { name, id, avatarUrl, placeholder } = profile
  const { setCurrentProfile } = useCurrentProfile()

  return (
    <DropdownMenuItem className='w-52 cursor-pointer' id={id} onClick={() => setCurrentProfile(profile)}>
      <div className='relative aspect-square size-12 rounded-sm border-2 border-primary'>
        <Image alt={`Perfil de ${name}`} blurDataURL={placeholder} placeholder='blur' src={avatarUrl} fill />
      </div>
      <span className='truncate text-sm'>{name}</span>
    </DropdownMenuItem>
  )
}

export interface ImageItemProps {
  profile: Models.Profile
}

export function InfoItem() {
  const { currentSession } = useCurrentSession()
  const userEmail = currentSession?.user.email

  return <DropdownMenuItem>{userEmail}</DropdownMenuItem>
}
