'use client'

import { Button } from '@/components/ui'
import { useUIStore } from '@/hooks'

export function ProfileButton() {
  const { isDeleteProfileAlertHidden, setIsDeleteProfileAlertHidden } = useUIStore()

  return (
    <Button size='lg' variant='outline' onClick={() => setIsDeleteProfileAlertHidden(!isDeleteProfileAlertHidden)}>
      Administrar perfiles
    </Button>
  )
}
