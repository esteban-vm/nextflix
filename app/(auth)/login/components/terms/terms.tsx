import { LuInfo } from 'react-icons/lu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'

export function Terms() {
  return (
    <p className='text-center text-sm text-gray-600'>
      Esta página utiliza Google reCAPTCHA para verificar que no eres un robot&nbsp;
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <LuInfo className='inline cursor-help stroke-gray-600' />
          </TooltipTrigger>
          <TooltipContent className='max-w-sm text-balance bg-background/90 text-sm text-gray-600 ~p-6/8' side='bottom'>
            La información recopilada por Google reCAPTCHA está sujeta a la política de privacidad y a las condiciones
            de servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio de reCAPTCHA, así como
            para fines generales de seguridad (Google no la utiliza para publicidad personalizada).
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </p>
  )
}
