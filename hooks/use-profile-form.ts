import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { Profiles } from '@/actions'
import { useProfileManagement } from '@/hooks/use-profile-management'
import { toast } from '@/hooks/use-toast'
import { ProfileSchema } from '@/lib/validations'

export function useProfileForm() {
  const { end } = useProfileManagement()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    Profiles.createOne,
    zodResolver(ProfileSchema),
    {
      actionProps: {
        onSuccess() {
          end('adding')
          toast({ title: 'Perfil creado correctamente' })
        },
        onError({ error }) {
          const errorTitle = error.validationErrors?._errors?.[0] ?? error.serverError
          toast({ title: errorTitle, variant: 'destructive' })
        },
        onSettled() {
          resetFormAndAction()
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

  return { form, control, isSubmitting, handleSubmitWithAction }
}
