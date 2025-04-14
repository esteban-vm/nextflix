'use client'

import { Button } from '@/components/ui'
import { useUIStore } from '@/hooks'

export function ProfileButton() {
  const { isDeletingProfile, setIsDeletingProfile } = useUIStore()

  return (
    <Button size='lg' variant='outline' onClick={() => setIsDeletingProfile(!isDeletingProfile)}>
      Administrar perfiles
    </Button>
  )
}
