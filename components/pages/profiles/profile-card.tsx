'use client'

import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { FullImage } from '@/components/common'
import { Profiles as UI } from '@/components/styled'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components/ui'
import { toast, useProfileStore } from '@/hooks'
import { cn } from '@/lib/utils'

export function ProfileCard({ profile }: ProfileCardProps) {
  const { push } = useRouter()
  const { start, end, isDeleting, setCurrentProfile, currentProfile } = useProfileStore()
  const { id, name, avatarUrl, placeholder } = profile

  const { execute, isPending } = useAction(ProfileActions.deleteOne, {
    onSuccess({ data }) {
      end('isDeleting')
      start('isCompleted')
      toast({ title: `El perfil de ${data?.name} ha sido eliminado correctamente` })
    },
    onError({ error }) {
      toast({ title: error.serverError, variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Eliminando perfil', description: 'Un momento…' })
    },
    onSettled() {
      end('isDeleting')
    },
  })

  const onSelectProfile = () => {
    if (isDeleting) return
    setCurrentProfile(profile)
    push('/')
  }

  const onDeleteProfile = () => {
    execute({ id })
    if (currentProfile?.id === id) {
      setCurrentProfile(null)
    }
  }

  return (
    <UI.ProfileCard.CardContainer aria-hidden='true' id={id} onClick={onSelectProfile}>
      <UI.ProfileCard.CardContent>
        <FullImage
          alt={`Perfil de ${name}`}
          blurDataURL={placeholder}
          src={avatarUrl}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            isDeleting ? 'blur-md' : 'group-hover:border-gray-500'
          )}
        />
        <UI.ProfileCard.DialogContainer $isHidden={!isDeleting}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='icon' variant='destructive'>
                <LuTrash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-md'>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Seguro que quieres eliminar este perfil?</AlertDialogTitle>
                <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Volver</AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={onDeleteProfile}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </UI.ProfileCard.DialogContainer>
      </UI.ProfileCard.CardContent>
      <UI.ProfileCard.ProfileName>{name}</UI.ProfileCard.ProfileName>
    </UI.ProfileCard.CardContainer>
  )
}

export interface ProfileCardProps {
  profile: Models.Profile
}
