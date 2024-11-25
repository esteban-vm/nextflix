import { FormButton, FormInput, FormWrapper } from '@/common'
import { useRegisterForm } from '@/hooks'
import { Form } from '@/ui'

export function RegisterForm() {
  const { form, control, isSubmitting, handleSubmitWithAction } = useRegisterForm()

  return (
    <Form {...form}>
      <FormWrapper id='register-form' onSubmit={handleSubmitWithAction}>
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Tu correo electrónico'
          name='email'
          placeholder='correo@ejemplo.com'
          type='email'
        />
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Tu contraseña'
          name='password'
          placeholder='********'
          type='password'
        />
        <FormInput
          control={control}
          disabled={isSubmitting}
          label='Repite tu contraseña'
          name='repeatPassword'
          placeholder='********'
          type='password'
        />
        <FormButton disabled={isSubmitting}>Regístrate</FormButton>
      </FormWrapper>
    </Form>
  )
}
