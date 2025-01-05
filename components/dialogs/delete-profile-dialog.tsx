import { useAction } from 'next-safe-action/hooks'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { useProfileStore, toast } from '@/hooks'
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
} from '@/ui'

export function DeleteProfileDialog({ profileId }: DeleteProfileDialogProps) {
  const { start, end, profile, setProfile } = useProfileStore()

  const { execute, isPending } = useAction(ProfileActions.deleteOne, {
    onSuccess() {
      if (profile?.id === profileId) setProfile(null)
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

  return (
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
          <AlertDialogAction disabled={isPending} onClick={() => execute({ id: profileId })}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export interface DeleteProfileDialogProps {
  profileId: string
}
