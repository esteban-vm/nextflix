import type { Profile } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormOptimisticAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { LuCheck } from 'react-icons/lu'
import { ProfileActions } from '@/actions'
import { FormButton, FormInput, FormRadioGroup, FormWrapper } from '@/common'
import { useProfileStore, toast } from '@/hooks'
import { ProfileSchema } from '@/lib/validations'
import { Form } from '@/ui'

export function ProfileForm({ profiles }: ProfileFormProps) {
  const { startAction, endAction } = useProfileStore()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormOptimisticAction(
    ProfileActions.createOne,
    zodResolver(ProfileSchema),
    {
      actionProps: {
        currentState: { profiles },
        updateFn(state, input) {
          return { profiles: [...state.profiles, input] }
        },
        onSuccess() {
          endAction('isAdding')
          startAction('isFinished')
          toast({ title: 'Perfil creado correctamente' })
        },
        onError({ error }) {
          const title = error.validationErrors?._errors?.[0] ?? error.serverError
          toast({ title, variant: 'destructive' })
        },
        onSettled() {
          resetFormAndAction()
          endAction('isAdding')
        },
        onExecute() {
          toast({ title: 'Creando perfil', description: 'Un momento…' })
        },
      },
      formProps: {
        defaultValues: {
          name: '',
          avatar: 'avatar1',
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

export interface ProfileFormProps {
  profiles: Partial<Profile>[]
}
