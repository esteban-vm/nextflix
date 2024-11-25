import { cn } from '@/lib/utils'
import { Button } from '@/ui'

export function FormButton({ className, ...rest }: FormButtonProps) {
  return <Button {...rest} className={cn('bg-rose-600 hover:bg-rose-700', className)} type='submit' variant='outline' />
}

export type FormButtonProps = Omit<Parameters<typeof Button>[number], 'type' | 'ref' | 'variant'>
