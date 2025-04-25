'use client'

import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useCallback } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { FullImage } from '@/components/common'
import { ProfilesUI as UI } from '@/components/styled'
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
import { toast, useCurrentProfile, useUIStore } from '@/hooks'
import { cn } from '@/lib/utils'

export function ProfileCard({ profile }: ProfileCardProps) {
  const { push } = useRouter()
  const { currentProfile, setCurrentProfile } = useCurrentProfile()
  const { isDeleteProfileAlertHidden, setIsDeleteProfileAlertHidden, setShouldRenderProfiles } = useUIStore()
  const { id, name, avatarUrl, placeholder } = profile

  const { execute, isPending, reset } = useAction(ProfileActions.deleteOne, {
    onSuccess({ data }) {
      setShouldRenderProfiles(true)
      toast({ title: `El perfil de ${data?.name} ha sido eliminado correctamente` })
    },
    onError({ error }) {
      toast({ title: error.serverError, variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Eliminando perfil', description: 'Un momento…' })
    },
    onSettled() {
      setIsDeleteProfileAlertHidden(true)
      reset()
    },
  })

  const onSelectProfile = useCallback(() => {
    if (!isDeleteProfileAlertHidden) return
    setCurrentProfile(profile)
    push('/')
  }, [isDeleteProfileAlertHidden, profile, push, setCurrentProfile])

  const onDeleteProfile = useCallback(() => {
    execute({ id })
    if (currentProfile?.id === id) {
      setCurrentProfile(null)
    }
  }, [currentProfile?.id, execute, id, setCurrentProfile])

  return (
    <UI.ProfileCard.CardContainer aria-hidden='true' id={id} onClick={onSelectProfile}>
      <UI.ProfileCard.CardContent>
        <FullImage
          alt={`Perfil de ${name}`}
          blurDataURL={placeholder}
          src={avatarUrl}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            isDeleteProfileAlertHidden ? 'group-hover:border-gray-500' : 'blur-md'
          )}
        />
        <UI.ProfileCard.DialogContainer $isHidden={isDeleteProfileAlertHidden}>
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
