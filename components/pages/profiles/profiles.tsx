import Image from 'next/image'
import { Button } from '@/components/ui'
import { useProfileStore } from '@/hooks'
import { avatars } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function AvatarImage({ profile }: WithProfile) {
  const { name, avatar } = profile
  const { isDeleting } = useProfileStore()

  return (
    <Image
      alt={`Perfil de ${name}`}
      src={avatars[avatar]}
      className={cn(
        'rounded-md border-2 border-transparent bg-cover',
        isDeleting ? 'blur-md' : 'group-hover:border-gray-500'
      )}
      fill
    />
  )
}

export function InnerWrapper({ children }: WithChildren) {
  return <div className='flex flex-wrap items-center justify-center'>{children}</div>
}

export function ManageButton() {
  const { toggle } = useProfileStore()

  return (
    <Button size='lg' variant='outline' onClick={() => toggle('isDeleting')}>
      Administrar perfiles
    </Button>
  )
}

export function PageSubtitle({ children }: WithChildren) {
  return <h3 className='italic ~text-lg/2xl'>{children}</h3>
}

export function PageTitle({ children }: WithChildren) {
  return <h2 className='~text-2xl/4xl'>{children}</h2>
}

export function PageWrapper({ children }: WithChildren) {
  return <div className='flex size-full flex-col items-center justify-center ~gap-3/4'>{children}</div>
}
