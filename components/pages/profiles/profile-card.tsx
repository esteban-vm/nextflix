import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { FullImage } from '@/components/pages/common'
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
import { cn } from '@/lib/utils'

export function ProfileCard({ profile }: ProfileCardProps) {
  const { push } = useRouter()
  const { start, end, isDeleting, setCurrentProfile } = useProfileStore()
  const { id, name, avatarUrl, placeholder } = profile

  const { execute, isPending } = useAction(ProfileActions.deleteOne, {
    onSuccess({ data }) {
      if (id === data?.id) {
        setCurrentProfile(null)
      }

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
        <FullImage
          alt={`Perfil de ${name}`}
          blurDataURL={placeholder}
          src={avatarUrl}
          className={cn(
            'rounded-md border-2 border-transparent bg-cover',
            isDeleting ? 'blur-md' : 'group-hover:border-gray-500'
          )}
        />
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

export interface ProfileCardProps {
  profile: Models.Profile
}
