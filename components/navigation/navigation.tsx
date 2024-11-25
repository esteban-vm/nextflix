import { Desktop } from '@/navigation/desktop'
import { Mobile } from '@/navigation/mobile'

export function Navigation() {
  return (
    <nav className='fixed inset-x-0 top-0 z-30 w-full transition-all duration-300'>
      <Desktop />
      <Mobile />
    </nav>
  )
}
