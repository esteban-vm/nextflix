import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { ProfileCardUI } from '@/components/pages/profiles/styled'
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
import { avatars } from '@/lib/constants'

export function ProfileCard({ profile }: WithProfile) {
  const { push } = useRouter()
  const { start, end, isDeleting, setCurrentProfile } = useProfileStore()
  const { id, name, avatar } = profile

  const { execute, isPending } = useAction(ProfileActions.deleteOne, {
    onSuccess({ input }) {
      if (id === input.id) {
        setCurrentProfile(null)
      }

      end('isDeleting')
      start('isCompleted')
      toast({ title: 'Perfil eliminado correctamente' })
    },
    onError() {
      toast({ title: 'Error al eliminar perfil', variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Eliminando perfil', description: 'Un momento…' })
    },
    onSettled() {
      end('isDeleting')
    },
  })

  const onChangeProfile = () => {
    if (!isDeleting) {
      setCurrentProfile(profile)
      push('/')
    }
  }

  const onDeleteProfile = () => {
    execute({ id })
  }

  return (
    <ProfileCardUI.CardContainer aria-hidden='true' id={id} onClick={onChangeProfile}>
      <ProfileCardUI.CardContent>
        <ProfileCardUI.AvatarImage $isBlur={isDeleting} alt={`Perfil de ${name}`} src={avatars[avatar]} fill />
        <ProfileCardUI.DialogContainer $isHidden={!isDeleting}>
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
        </ProfileCardUI.DialogContainer>
      </ProfileCardUI.CardContent>
      <ProfileCardUI.ProfileName>{name}</ProfileCardUI.ProfileName>
    </ProfileCardUI.CardContainer>
  )
}
