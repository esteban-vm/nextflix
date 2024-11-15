'use client'

import { AuthField, AuthButton } from '@/(auth)/components'
import { useRegisterForm } from '@/(auth)/hooks'
import { Form } from '@/components/ui'

export function RegisterForm() {
  const { form, control, isSubmitting, handleSubmitWithAction } = useRegisterForm()

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
