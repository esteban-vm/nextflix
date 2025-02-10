import { LuLogOut, LuPencil } from 'react-icons/lu'
import { DropdownMenuItem } from '@/components/ui'

export function LogoutButton(props: NavButtonProps) {
  return (
    <DropdownMenuItem className='flex cursor-pointer justify-between' {...props}>
      Cerrar sesión
      <LuLogOut className='size-6' />
    </DropdownMenuItem>
  )
}

export function ManageButton(props: NavButtonProps) {
  return (
    <DropdownMenuItem className='flex cursor-pointer justify-between' {...props}>
      Administrar perfiles
      <LuPencil className='size-6' />
    </DropdownMenuItem>
  )
}

export interface NavButtonProps {
  onClick: () => void
}
