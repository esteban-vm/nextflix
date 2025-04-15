'use client'

import { Button } from '@/components/ui'
import { useUIStore } from '@/hooks'

export function ProfileButton() {
  const { isShowingDeleteProfileAlert, setIsShowingDeleteProfileAlert } = useUIStore()

  return (
    <Button size='lg' variant='outline' onClick={() => setIsShowingDeleteProfileAlert(!isShowingDeleteProfileAlert)}>
      Administrar perfiles
    </Button>
  )
}
