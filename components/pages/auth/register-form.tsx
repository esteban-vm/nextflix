'use client'

import type { HTMLInputTypeAttribute } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuAtSign, LuEye, LuEyeOff } from 'react-icons/lu'
import { AuthActions } from '@/actions'
import { FormButton, FormInput, FormWrapper } from '@/components/pages/common'
import { Form } from '@/components/ui'
import { toast } from '@/hooks'
import { RegisterSchema } from '@/lib/validations'

export function RegisterForm() {
  const { push } = useRouter()
  const [isShowingPassword, setIsShowingPassword] = useState(false)

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

  const passInputIcon = isShowingPassword ? LuEyeOff : LuEye
  const passInputPlaceholder = isShowingPassword ? undefined : '********'
  const passInputType: HTMLInputTypeAttribute = isShowingPassword ? 'text' : 'password'

  const togglePassShowing = () => {
    setIsShowingPassword(!isShowingPassword)
  }

  return (
    <Form {...form}>
      <FormWrapper id='register-form' onSubmit={handleSubmitWithAction}>
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
          icon={passInputIcon}
          label='Tu contraseña'
          maxLength={15}
          name='password'
          placeholder={passInputPlaceholder}
          spellCheck={false}
          type={passInputType}
          onIconClick={togglePassShowing}
        />
        <FormInput
          control={control}
          disabled={isSubmitting}
          icon={passInputIcon}
          label='Repite tu contraseña'
          maxLength={15}
          name='repeatPassword'
          placeholder={passInputPlaceholder}
          spellCheck={false}
          type={passInputType}
          onIconClick={togglePassShowing}
        />
        <FormButton disabled={isSubmitting}>Regístrate</FormButton>
      </FormWrapper>
    </Form>
  )
}
