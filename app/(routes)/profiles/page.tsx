import { ProfileActions } from '@/actions'
import { ProfileManager } from '@/containers'
import { checkUserSession } from '@/lib/auth'

export default async function ProfilesPage() {
  await checkUserSession()
  const profiles = await ProfileActions.findAll()

  return (
    <div className='flex size-full flex-col items-center justify-center ~gap-3/4'>
      <h2 className='~text-2xl/4xl'>¿Quién eres?</h2>
      <h3 className='italic ~text-lg/2xl'>Elige tu perfil</h3>
      <ProfileManager profiles={profiles?.data} />
    </div>
  )
}
