import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ProfileModal } from '@/modals'
import { Button } from '@/ui'

export default async function ProfilesPage() {
  const session = await auth()

  if (!session?.user) redirect('/login')

  return (
    <div className='flex size-full flex-col items-center justify-center gap-3'>
      <h2 className='~text-2xl/4xl'>¿Quién eres? Elige tu perfil</h2>
      <div className='flex ~gap-5/7'>
        <h3>Perfiles…</h3>
        <ProfileModal />
      </div>
      <div className='flex items-center justify-center'>
        <Button size='lg' variant='outline'>
          Administrar perfiles
        </Button>
      </div>
    </div>
  )
}
