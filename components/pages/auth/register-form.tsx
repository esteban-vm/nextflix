'use client'

import type { HTMLInputTypeAttribute } from 'react'
import { useCallback, useState } from 'react'
import { LuAtSign, LuEye, LuEyeOff } from 'react-icons/lu'
import { FormButton, FormInput, FormWrapper } from '@/components/common'
import { Form } from '@/components/ui'
import { useRegisterForm } from '@/hooks'

export function RegisterForm() {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const { form, handleSubmitWithAction } = useRegisterForm()

  const {
    control,
    formState: { isSubmitting },
  } = form

  const passInputIcon = isShowingPassword ? LuEyeOff : LuEye
  const passInputPlaceholder = isShowingPassword ? undefined : '********'
  const passInputType: HTMLInputTypeAttribute = isShowingPassword ? 'text' : 'password'

  const togglePassShowing = useCallback(() => {
    setIsShowingPassword(!isShowingPassword)
  }, [isShowingPassword])

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
