import { LuPlusCircle } from 'react-icons/lu'
import { ProfileForm } from '@/forms'
import { useProfileManagement } from '@/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/ui'

export function AddProfileDialog() {
  const { adding, toggle } = useProfileManagement()

  return (
    <Dialog open={adding} onOpenChange={() => toggle('adding')}>
      <DialogTrigger className='flex flex-col items-center justify-center gap-2 transition-all ~size-28/32 hover:opacity-90 active:scale-95'>
        <div className='flex size-3/4 items-center justify-center'>
          <LuPlusCircle className='size-5/6 stroke-gray-500' />
        </div>
        <span className='font-semibold uppercase text-gray-500'>Añadir perfil</span>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Añadir perfil</DialogTitle>
          <DialogDescription>Añade los diferentes perfiles a tu usuario.</DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  )
}
