'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { FormButton } from '@/(auth)/components'
import { login } from '@/actions'
import { toast } from '@/hooks'
import { loginSchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/ui'

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
      <form
        autoComplete='off'
        className='flex flex-col gap-3'
        spellCheck={false}
        noValidate
        onSubmit={handleSubmitWithAction}
      >
        <FormField
          control={control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tu correo electrónico:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} placeholder='correo@ejemplo.com' type='email' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <FormField
          control={control}
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tu contraseña:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} type='password' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <FormButton disabled={isSubmitting}>Iniciar sesión</FormButton>
      </form>
    </Form>
  )
}