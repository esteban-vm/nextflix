import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { ProfileActions } from '@/actions'
import { toast } from '@/hooks/use-toast'
import { useUIStore } from '@/hooks/use-ui-store'
import { avatarUrls } from '@/lib/constants'
import { ProfileSchema } from '@/lib/validations'

export const useProfileForm = () => {
  const { setShouldRenderProfiles } = useUIStore()

  const action = useHookFormAction(ProfileActions.createOne, zodResolver(ProfileSchema), {
    actionProps: {
      onSuccess({ data }) {
        setShouldRenderProfiles(true)
        toast({ title: `El perfil de ${data?.name} ha sido creado correctamente` })
      },
      onError({ error }) {
        toast({ title: error.validationErrors?._errors?.[0], variant: 'destructive' })
      },
      onSettled() {
        action.resetFormAndAction()
      },
      onExecute() {
        toast({ title: 'Creando perfil', description: 'Un momento…' })
      },
    },
    formProps: {
      defaultValues: {
        name: '',
        avatarUrl: avatarUrls[0],
      },
    },
  })

  return action
}
