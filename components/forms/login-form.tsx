import { FormButton, FormInput, FormWrapper } from '@/common'
import { useLoginForm } from '@/hooks'
import { Form } from '@/ui'

export function LoginForm() {
  const { form, control, isSubmitting, handleSubmitWithAction } = useLoginForm()

  return (
    <Form {...form}>
      <FormWrapper id='login-form' onSubmit={handleSubmitWithAction}>
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
        <FormButton disabled={isSubmitting}>Iniciar sesión</FormButton>
      </FormWrapper>
    </Form>
  )
}
