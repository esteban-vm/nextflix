import { BsQuestionCircle } from 'react-icons/bs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui'

export function AuthTerms() {
  return (
    <p className='text-center text-sm leading-tight text-primary/50'>
      Esta página utiliza Google reCAPTCHA para verificar que no eres un robot&nbsp;
      <Tooltip>
        <TooltipTrigger>
          <BsQuestionCircle className='inline cursor-help fill-primary/50' />
        </TooltipTrigger>
        <TooltipContent className='max-w-sm text-pretty bg-background text-sm italic leading-tight text-primary/50 ~p-4/6'>
          La información recopilada por Google reCAPTCHA está sujeta a la política de privacidad y a las condiciones de
          servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así como para
          fines generales de seguridad (Google no la utiliza para publicidad personalizada).
        </TooltipContent>
      </Tooltip>
    </p>
  )
}
