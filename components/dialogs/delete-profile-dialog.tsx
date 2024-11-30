import { LuTrash2 } from 'react-icons/lu'
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

export function DeleteProfileDialog() {
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
          <AlertDialogAction>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
