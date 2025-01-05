import type { Profile } from '@prisma/client'
import { LuPlusCircle } from 'react-icons/lu'
import { ProfileForm } from '@/forms'
import { useProfileStore } from '@/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/ui'

export function AddProfileDialog({ profiles, remaining }: AddProfileDialogProps) {
  const { isAdding, toggle } = useProfileStore()

  return (
    <Dialog open={isAdding} onOpenChange={() => toggle('isAdding')}>
      <DialogTrigger className='flex flex-col items-center justify-center transition-all ~size-28/32 hover:opacity-90 active:scale-95'>
        <div className='flex size-3/4 items-center justify-center'>
          <LuPlusCircle className='size-5/6 stroke-gray-500' />
        </div>
        <span className='font-semibold uppercase text-gray-500'>Añadir perfil</span>
        <small className='font-semibold text-gray-500'>({remaining}/5)</small>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Añadir perfil</DialogTitle>
          <DialogDescription>Añade los diferentes perfiles a tu usuario.</DialogDescription>
        </DialogHeader>
        <ProfileForm profiles={profiles} />
      </DialogContent>
    </Dialog>
  )
}

export interface AddProfileDialogProps {
  profiles: Profile[]
  remaining: number
}
