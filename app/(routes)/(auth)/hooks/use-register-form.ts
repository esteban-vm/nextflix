import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { register } from '@/actions'
import { toast } from '@/hooks'
import { registerSchema } from '@/lib/validations'

export function useRegisterForm() {
  const { push } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    register,
    zodResolver(registerSchema),
    {
      actionProps: {
        onSuccess() {
          push('/login')
          toast({ title: 'Te has registrado correctamente', description: '¡Bienvenido/a!' })
        },
        onError({ error }) {
          toast({ title: error.validationErrors?._errors?.[0], variant: 'destructive' })
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
    formState: { isSubmitting },
  } = form

  return { form, control, isSubmitting, handleSubmitWithAction }
}
