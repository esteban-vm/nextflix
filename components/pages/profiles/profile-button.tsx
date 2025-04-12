'use client'

import { Button } from '@/components/ui'
import { useProfileStore } from '@/hooks'

export function ProfileButton() {
  const { toggle } = useProfileStore()

  return (
    <Button size='lg' variant='outline' onClick={() => toggle('isDeleting')}>
      Administrar perfiles
    </Button>
  )
}
