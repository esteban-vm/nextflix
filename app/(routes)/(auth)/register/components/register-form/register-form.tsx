'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { AuthField, AuthButton } from '@/(auth)/components'
import { register } from '@/actions'
import { Form } from '@/components/ui'
import { toast } from '@/hooks'
import { registerSchema } from '@/lib/validations'

export function RegisterForm() {
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

  return (
    <Form {...form}>
      <form autoComplete='off' id='register-form' spellCheck={false} noValidate onSubmit={handleSubmitWithAction}>
        <AuthField
          control={control}
          disabled={isSubmitting}
          label='Tu correo electrónico'
          name='email'
          placeholder='correo@ejemplo.com'
          type='email'
        />
        <AuthField control={control} disabled={isSubmitting} label='Tu contraseña' name='password' />
        <AuthField control={control} disabled={isSubmitting} label='Repite tu contraseña' name='repeatPassword' />
        <AuthButton disabled={isSubmitting}>Regístrate</AuthButton>
      </form>
    </Form>
  )
}
