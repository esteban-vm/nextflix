import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { AuthActions } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { LoginSchema } from '@/lib/validations'
import { users } from '@/prisma/data'

export const useLoginForm = () => {
  const [{ email, password }] = users

  const action = useHookFormAction(AuthActions.login, zodResolver(LoginSchema), {
    actionProps: {
      onSuccess() {
        toast({ title: 'Has iniciado sesión correctamente', description: '¡Bienvenido/a!' })
      },
      onError({ error }) {
        toast({ title: error.serverError, variant: 'destructive' })
      },
      onSettled() {
        action.resetFormAndAction()
      },
      onExecute() {
        toast({ title: 'Iniciando sesión', description: 'Un momento…' })
      },
    },
    formProps: {
      defaultValues: { email, password },
    },
  })

  return action
}
