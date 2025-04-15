'use client'

import { Button } from '@/components/ui'
import { useUIStore } from '@/hooks'

export function ProfileButton() {
  const { isDeleteProfileAlertOpen, setIsDeleteProfileAlertOpen } = useUIStore()

  return (
    <Button size='lg' variant='outline' onClick={() => setIsDeleteProfileAlertOpen(!isDeleteProfileAlertOpen)}>
      Administrar perfiles
    </Button>
  )
}
