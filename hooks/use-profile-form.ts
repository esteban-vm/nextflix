import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { addProfile } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { profileSchema } from '@/lib/validations'

export interface UseProfileFormProps {
  modalOpen: (value: boolean) => void
}

export function useProfileForm({ modalOpen }: UseProfileFormProps) {
  const { refresh } = useRouter()

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    addProfile,
    zodResolver(profileSchema),
    {
      actionProps: {
        onSuccess() {
          modalOpen(false)
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
          avatar: '/profiles/profile-1.png',
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
