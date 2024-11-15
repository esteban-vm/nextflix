import { Button } from '@/components/ui'

export function AuthButton(props: AuthButtonProps) {
  return <Button {...props} className='bg-rose-700 text-white hover:bg-rose-600' type='submit' />
}

export type AuthButtonProps = Omit<Parameters<typeof Button>[number], 'className' | 'type' | 'ref'>
