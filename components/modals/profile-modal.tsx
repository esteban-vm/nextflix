import { useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import { ProfileForm } from '@/forms'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/ui'

export function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='flex flex-col items-center justify-center gap-2 transition-all active:scale-95'>
        <LuPlusCircle className='stroke-secondary ~size-12/14' />
        <span className='font-semibold uppercase text-secondary'>Añadir perfil</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir perfil</DialogTitle>
          <DialogDescription>Añade los diferentes perfiles a tu usuario.</DialogDescription>
        </DialogHeader>
        <ProfileForm modalOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
