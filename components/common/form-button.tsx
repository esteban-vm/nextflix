import type { ButtonProps } from '@/components/ui'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

export function FormButton({ className, ...rest }: FormButtonProps) {
  return <Button {...rest} className={cn('bg-rose-600 hover:bg-rose-700', className)} type='submit' variant='outline' />
}

export type FormButtonProps = Omit<ButtonProps, 'type' | 'ref' | 'variant'>
