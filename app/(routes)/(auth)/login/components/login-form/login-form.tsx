'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { AuthField, AuthButton } from '@/(auth)/components'
import { login } from '@/actions'
import { Form } from '@/components/ui'
import { toast } from '@/hooks'
import { loginSchema } from '@/lib/validations'

export function LoginForm() {
  const { push, refresh } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(login, zodResolver(loginSchema), {
    actionProps: {
      onSuccess() {
        push('/')
        refresh()
        toast({ title: 'Sesión iniciada correctamente', description: '¡Bienvenido/a!' })
      },
      onError({ error }) {
        const errorTitle = error.validationErrors?._errors?.[0] ?? error.serverError
        toast({ title: errorTitle, variant: 'destructive' })
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
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form autoComplete='off' id='login-form' spellCheck={false} noValidate onSubmit={handleSubmitWithAction}>
        <AuthField
          control={control}
          disabled={isSubmitting}
          label='Tu correo electrónico'
          name='email'
          placeholder='correo@ejemplo.com'
          type='email'
        />
        <AuthField control={control} disabled={isSubmitting} label='Tu contraseña' name='password' />
        <AuthButton disabled={isSubmitting}>Iniciar sesión</AuthButton>
      </form>
    </Form>
  )
}
