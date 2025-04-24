import { LogoLink, NavLink } from '@/components/navigation/atoms'
import { NavMenu } from '@/components/navigation/organisms'
import { useCurrentSession, useScrollPosition } from '@/hooks'
import { navLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function DesktopNav() {
  const { currentSession } = useCurrentSession()
  const { scrollPosition } = useScrollPosition()

  return (
    <div className={cn('hidden py-4 lg:block', scrollPosition > 20 ? 'bg-black' : 'bg-transparent')}>
      <div className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 2xl:px-0'>
        <div className='flex items-center gap-4'>
          <LogoLink />
          <div />
          {currentSession && navLinks.map((link) => <NavLink key={link.name} {...link} />)}
        </div>
        <NavMenu />
      </div>
    </div>
  )
}
