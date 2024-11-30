'use client'

import { useState } from 'react'
import { AvatarImage } from '@/common'
import { AddProfileDialog } from '@/dialogs'
import { Button } from '@/ui'

export function ProfileManager() {
  const [isManagingProfiles, setIsManagingProfiles] = useState(false)

  return (
    <>
      <div className='flex flex-wrap items-center justify-center ~gap-3/5'>
        <AvatarImage image='avatar1' isEditing={isManagingProfiles} name='Nombre del perfil' />
        <AddProfileDialog />
      </div>
      <Button size='lg' variant='outline' onClick={() => setIsManagingProfiles(!isManagingProfiles)}>
        Administrar perfiles
      </Button>
    </>
  )
}
