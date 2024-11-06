import { Button } from '@/components/ui'

export function FormButton(props: FormButtonProps) {
  return <Button {...props} className='bg-rose-700 text-white hover:bg-rose-600' type='submit' />
}

export type FormButtonProps = Omit<Parameters<typeof Button>[number], 'className' | 'type' | 'ref'>
