import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { LuTrash2 } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
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
import { useProfileStore, toast } from '@/hooks'
import { cn } from '@/lib/utils'

export function ProfileCard({ profile, children }: ProfileCardProps) {
  const { push } = useRouter()
  const { start, end, isDeleting, setCurrentProfile } = useProfileStore()
  const { id, name } = profile

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
    <div
      aria-hidden='true'
      className='group flex cursor-pointer select-none flex-col items-center justify-center gap-2 transition-all ~size-28/32'
      onClick={onChangeProfile}
    >
      <div className='relative size-3/4'>
        {children}
        <div className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', !isDeleting && 'hidden')}>
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
        </div>
      </div>
      <span className='max-w-full truncate font-semibold uppercase text-gray-500 group-hover:opacity-90'>{name}</span>
    </div>
  )
}

export interface ProfileCardProps extends WithProfile, WithChildren {}
