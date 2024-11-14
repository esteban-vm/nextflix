'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { FormButton } from '@/(auth)/components'
import { register } from '@/actions'
import { toast } from '@/hooks'
import { registerSchema } from '@/lib/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/ui'

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

        <FormField
          control={control}
          name='repeatPassword'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Repite tu contraseña:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} type='password' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <FormButton disabled={isSubmitting}>Regístrate</FormButton>
      </form>
    </Form>
  )
}
