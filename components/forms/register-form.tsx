import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { AuthActions } from '@/actions'
import { FormButton, FormInput, FormWrapper } from '@/common'
import { toast } from '@/hooks'
import { RegisterSchema } from '@/lib/validations'
import { Form } from '@/ui'

export function RegisterForm() {
  const { push } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    AuthActions.register,
    zodResolver(RegisterSchema),
    {
      actionProps: {
        onSuccess() {
          push('/login')
          toast({ title: 'Te has registrado correctamente', description: '¡Bienvenido/a!' })
        },
        onError({ error }) {
          toast({ title: error.serverError, variant: 'destructive' })
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

  return (
    <Form {...form}>
      <FormWrapper id='register-form' onSubmit={handleSubmitWithAction}>
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
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Repite tu contraseña'
          name='repeatPassword'
          placeholder='********'
          type='password'
        />
        <FormButton disabled={isSubmitting}>Regístrate</FormButton>
      </FormWrapper>
    </Form>
  )
}
