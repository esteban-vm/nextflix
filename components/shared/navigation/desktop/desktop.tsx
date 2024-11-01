'use client'

import { BellRing, Search, User } from 'lucide-react'
import { useScrollPosition } from '@/hooks'
import { navigationItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Logo } from '@/shared/logo'
import { NavigationItem } from '@/shared/navigation-item'

export function Desktop() {
  const { scrollPosition } = useScrollPosition()

  return (
    <div className='mx-auto hidden md:block'>
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-30 h-16 w-full transition-all duration-300',
          scrollPosition > 20 ? 'bg-black' : 'bg-transparent'
        )}
      >
        <div className='mx-auto flex h-full items-center px-[4%]'>
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Logo />
              <div className='ml-10 flex gap-4'>
                {navigationItems.map((link) => (
                  <NavigationItem key={link.name} {...link} />
                ))}
              </div>
            </div>
            <div className='flex items-center gap-4 [&_svg]:cursor-pointer'>
              <Search />
              <BellRing />
              <User />
              {/* <div className='flex items-center gap-2'>
                <p>Profile</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
