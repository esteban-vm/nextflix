'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { LuAtSign, LuEye, LuEyeOff } from 'react-icons/lu'
import { AuthActions } from '@/actions'
import { FormButton, FormInput, FormWrapper } from '@/components/common'
import { Form } from '@/components/ui'
import { toast } from '@/hooks'
import { LoginSchema } from '@/lib/validations'

export function LoginForm() {
  const [isShowingPassword, setIsShowingPassword] = useState(false)

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    AuthActions.login,
    zodResolver(LoginSchema),
    {
      actionProps: {
        onSuccess() {
          toast({ title: 'Has iniciado sesión correctamente', description: '¡Bienvenido/a!' })
        },
        onError({ error }) {
          toast({ title: error.serverError, variant: 'destructive' })
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
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <FormWrapper id='login-form' onSubmit={handleSubmitWithAction}>
        <FormInput
          control={control}
          disabled={isSubmitting}
          icon={LuAtSign}
          label='Tu correo electrónico'
          name='email'
          placeholder='correo@ejemplo.com'
          type='email'
        />
        <FormInput
          control={control}
          disabled={isSubmitting}
          icon={isShowingPassword ? LuEyeOff : LuEye}
          label='Tu contraseña'
          maxLength={15}
          name='password'
          placeholder={isShowingPassword ? undefined : '********'}
          spellCheck={false}
          type={isShowingPassword ? 'text' : 'password'}
          onIconClick={() => setIsShowingPassword(!isShowingPassword)}
        />
        <FormButton disabled={isSubmitting}>Iniciar sesión</FormButton>
      </FormWrapper>
    </Form>
  )
}
