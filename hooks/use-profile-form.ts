import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { addProfile } from '@/actions'
import { useProfileContext } from '@/hooks/use-profile-context'
import { toast } from '@/hooks/use-toast'
import { ProfileSchema } from '@/lib/validations'

export function useProfileForm() {
  const { setIsAdding } = useProfileContext()
  const { refresh } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    addProfile,
    zodResolver(ProfileSchema),
    {
      actionProps: {
        onSuccess() {
          setIsAdding(false)
          refresh()
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
