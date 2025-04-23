import type { MouseEventHandler } from 'react'
import { useCallback } from 'react'
import { LuUserCheck } from 'react-icons/lu'
import { FullImage } from '@/components/common'
import { DropdownMenuItem } from '@/components/ui'
import { useCurrentProfile, useCurrentSession } from '@/hooks'
import { cn } from '@/lib/utils'

export function ImageItem({ profile }: ImageItemProps) {
  const { name, id, avatarUrl, placeholder } = profile
  const { currentProfile, setCurrentProfile } = useCurrentProfile()
  const currentName = currentProfile?.name

  const onSelectProfile = useCallback<MouseEventHandler>(
    (event) => {
      if (currentName === name) {
        event.preventDefault()
        return
      }

      setCurrentProfile(profile)
    },
    [currentName, name, profile, setCurrentProfile]
  )

  return (
    <DropdownMenuItem className='w-52 cursor-pointer' id={id} onClick={onSelectProfile}>
      <div
        className={cn(
          'relative aspect-square size-12 rounded-sm border-2',
          currentName === name ? 'border-primary bg-primary' : 'border-gray-500 bg-gray-500'
        )}
      >
        <FullImage alt={`Perfil de ${name}`} blurDataURL={placeholder} className='rounded-sm' src={avatarUrl} />
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

  return (
    <DropdownMenuItem className='flex justify-between' onClick={(event) => event.preventDefault()}>
      {userEmail}
      <LuUserCheck className='size-6' />
    </DropdownMenuItem>
  )
}
