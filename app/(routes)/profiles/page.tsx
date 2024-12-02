import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ProfileManager } from '@/containers'
import { getProfilesByUserId } from '@/lib/auth'

export default async function ProfilesPage() {
  const session = await auth()

  if (!session?.user) redirect('/login')

  const profiles = await getProfilesByUserId(session.user.id)

  return (
    <div className='flex size-full flex-col items-center justify-center ~gap-3/4'>
      <h2 className='~text-2xl/4xl'>¿Quién eres?</h2>
      <h3 className='italic ~text-lg/2xl'>Elige tu perfil</h3>
      <ProfileManager profiles={profiles} />
    </div>
  )
}
