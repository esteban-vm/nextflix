import type { UseProfileFormProps as ProfileFormProps } from '@/hooks'
import { LuCheck } from 'react-icons/lu'
import { FormButton, FormInput, FormRadioGroup, FormWrapper } from '@/common'
import { useProfileForm } from '@/hooks'
import { Form } from '@/ui'

export function ProfileForm(props: ProfileFormProps) {
  const { form, control, isSubmitting, handleSubmitWithAction } = useProfileForm(props)

  return (
    <Form {...form}>
      <FormWrapper className='flex flex-col gap-4' onSubmit={handleSubmitWithAction}>
        <FormInput control={control} disabled={isSubmitting} label='Nombre de perfil' name='name' />
        <FormRadioGroup control={control} label='Imagen de perfil' name='avatar' />
        <FormButton className='md:w-fit' disabled={isSubmitting}>
          <LuCheck /> Crear perfil
        </FormButton>
      </FormWrapper>
    </Form>
  )
}
