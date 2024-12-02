import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { login } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { LoginSchema } from '@/lib/validations'

export function useLoginForm() {
  const { push, refresh } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(login, zodResolver(LoginSchema), {
    actionProps: {
      onSuccess() {
        push('/profiles')
        refresh()
        toast({ title: 'Sesión iniciada correctamente', description: '¡Bienvenido/a!' })
      },
      onError({ error }) {
        const errorTitle = error.validationErrors?._errors?.[0] ?? error.serverError
        toast({ title: errorTitle, variant: 'destructive' })
        setFocus('email')
      },
      onSettled() {
        resetFormAndAction()
      },
      onExecute() {
        toast({ title: 'Iniciando sesión', description: 'Un momento…' })
      },
    },
    formProps: {
      defaultValues: {
        email: '',
        password: '',
      },
    },
  })

  const {
    control,
    setFocus,
    formState: { isSubmitting },
  } = form

  return { form, control, isSubmitting, handleSubmitWithAction }
}
