import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export default async function ProfilesPage() {
  const session = await auth()

  if (!session?.user) redirect('/login')

  const profiles = await db.profile.findMany({
    where: { userId: session.user.id },
  })

  console.log(profiles)

  return <div className='flex size-full flex-col items-center justify-center'>Profiles Page</div>
}
