'use client'

import type { Profile } from '@prisma/client'
import { useState } from 'react'
import { ProfileItem } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { Button } from '@/ui'

export function ProfileManager({ profiles }: ProfileManagerProps) {
  const [isManagingProfiles, setIsManagingProfiles] = useState(false)

  return (
    <>
      <div className='flex flex-wrap items-center justify-center ~gap-3/5'>
        {profiles.map(({ id, avatar, name }) => (
          <ProfileItem key={id} image={avatar} isEditing={isManagingProfiles} name={name} />
        ))}
        <AddProfileDialog />
      </div>

      {!!profiles.length && (
        <Button size='lg' variant='outline' onClick={() => setIsManagingProfiles(!isManagingProfiles)}>
          Administrar perfiles
        </Button>
      )}
    </>
  )
}

export interface ProfileManagerProps {
  profiles: ProfileData[]
}

type ProfileData = Omit<Profile, 'createdAt' | 'updatedAt'>
