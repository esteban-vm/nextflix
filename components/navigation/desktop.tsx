import { AppLogo, NavIcons, NavLink } from '@/common'
import { useScrollPosition } from '@/hooks'
import { navLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Desktop() {
  const { scrollPosition } = useScrollPosition()

  return (
    <div className={cn('hidden py-4 lg:block', scrollPosition > 20 ? 'bg-black' : 'bg-transparent')}>
      <div className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 2xl:px-0'>
        <div className='flex items-center gap-4'>
          <AppLogo />
          <div />
          {navLinks.map((link) => (
            <NavLink key={link.name} {...link} />
          ))}
        </div>
        <div className='flex gap-2 [&_svg]:cursor-pointer [&_svg]:~size-5/6'>
          <NavIcons />
        </div>
      </div>
    </div>
  )
}
