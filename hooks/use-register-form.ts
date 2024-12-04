import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { Auth } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { RegisterSchema } from '@/lib/validations'

export function useRegisterForm() {
  const { push } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    Auth.register,
    zodResolver(RegisterSchema),
    {
      actionProps: {
        onSuccess() {
          push('/login')
          toast({ title: 'Te has registrado correctamente', description: '¡Bienvenido/a!' })
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
    }
  )

  const {
    control,
    setFocus,
    formState: { isSubmitting },
  } = form

  return { form, control, isSubmitting, handleSubmitWithAction }
}
