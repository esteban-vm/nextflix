import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { Profiles } from '@/actions'
import { useProfileContext } from '@/hooks/use-profile-context'
import { toast } from '@/hooks/use-toast'
import { ProfileSchema } from '@/lib/validations'

export function useProfileForm() {
  const { setIsAdding } = useProfileContext()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    Profiles.createOne,
    zodResolver(ProfileSchema),
    {
      actionProps: {
        onSuccess() {
          setIsAdding(false)
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
