import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { AuthActions } from '@/actions'
import { FormButton, FormInput, FormWrapper } from '@/common'
import { toast } from '@/hooks'
import { LoginSchema } from '@/lib/validations'
import { Form } from '@/ui'

export function LoginForm() {
  const { push, refresh } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    AuthActions.login,
    zodResolver(LoginSchema),
    {
      actionProps: {
        onSuccess() {
          push('/profiles')
          refresh()
          toast({ title: 'Has iniciado sesión correctamente', description: '¡Bienvenido/a!' })
        },
        onError({ error }) {
          toast({ title: error.serverError, variant: 'destructive' })
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
    }
  )

  const {
    control,
    setFocus,
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <FormWrapper id='login-form' onSubmit={handleSubmitWithAction}>
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Tu correo electrónico'
          name='email'
          placeholder='correo@ejemplo.com'
          type='email'
        />
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Tu contraseña'
          name='password'
          placeholder='********'
          type='password'
        />
        <FormButton disabled={isSubmitting}>Iniciar sesión</FormButton>
      </FormWrapper>
    </Form>
  )
}
