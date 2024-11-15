'use client'

import { AuthField, AuthButton } from '@/(auth)/components'
import { useLoginForm } from '@/(auth)/hooks'
import { Form } from '@/components/ui'

export function LoginForm() {
  const { form, control, isSubmitting, handleSubmitWithAction } = useLoginForm()

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
