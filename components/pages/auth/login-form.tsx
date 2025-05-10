'use client'

import { useState } from 'react'
import { LuAtSign, LuEye, LuEyeOff } from 'react-icons/lu'
import { FormButton, FormInput, FormWrapper } from '@/components/common'
import { Form } from '@/components/ui'
import { useLoginForm } from '@/hooks'

export function LoginForm() {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const { form, handleSubmitWithAction } = useLoginForm()

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
