import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { AuthActions } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { RegisterSchema } from '@/lib/validations'

export const useRegisterForm = () => {
  const action = useHookFormAction(AuthActions.register, zodResolver(RegisterSchema), {
    actionProps: {
      onSuccess() {
        toast({ title: 'Te has registrado correctamente', description: '¡Bienvenido/a!' })
      },
      onError({ error }) {
        toast({ title: error.serverError, variant: 'destructive' })
      },
      onSettled() {
        action.resetFormAndAction()
      },
      onExecute() {
        toast({ title: 'Creando cuenta', description: 'Un momento…' })
      },
    },
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
        repeatPassword: '',
      },
    },
  })

  return action
}
