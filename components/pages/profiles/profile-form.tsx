'use client'

import { useState } from 'react'
import { LuCheck } from 'react-icons/lu'
import { FormButton, FormInput, FormRadioButton, FormRadioGroup, FormWrapper } from '@/components/common'
import { ProfilesUI as UI } from '@/components/styled'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Form } from '@/components/ui'
import { useProfileForm } from '@/hooks'
import { avatarUrls } from '@/lib/constants'

export function ProfileForm({ remaining }: ProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { form, handleSubmitWithAction } = useProfileForm()

  const {
    watch,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <UI.ProfileForm.StyledTrigger>
        <UI.ProfileForm.IconContainer>
          <UI.ProfileForm.IconCircle />
        </UI.ProfileForm.IconContainer>
        <UI.ProfileForm.TriggerText>Añadir perfil</UI.ProfileForm.TriggerText>
        <UI.ProfileForm.RemainingText>({remaining}/4)</UI.ProfileForm.RemainingText>
      </UI.ProfileForm.StyledTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Añadir perfil</DialogTitle>
          <DialogDescription>Añade los diferentes perfiles a tu usuario.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormWrapper className='flex flex-col gap-4' id='profile-form' onSubmit={handleSubmitWithAction}>
            <FormInput control={control} disabled={isSubmitting} label='Nombre de perfil' maxLength={10} name='name' />
            <FormRadioGroup control={control} label='Imagen de perfil' name='avatarUrl'>
              {avatarUrls.map((avatar) => (
                <FormRadioButton key={avatar} avatarUrl={avatar} isActive={watch('avatarUrl') === avatar} />
              ))}
            </FormRadioGroup>
            <FormButton className='md:w-fit' disabled={isSubmitting}>
              <LuCheck /> Crear perfil
            </FormButton>
          </FormWrapper>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export interface ProfileFormProps {
  remaining: number
}
