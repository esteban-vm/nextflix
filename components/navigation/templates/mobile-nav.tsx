import { LuMenu } from 'react-icons/lu'
import { LogoLink, NavLink } from '@/components/navigation/atoms'
import { NavMenu } from '@/components/navigation/organisms'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { useScrollPosition, useUIStore } from '@/hooks'
import { navLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const { isMobileNavigationOpen, setIsMobileNavigationOpen } = useUIStore()
  const { scrollPosition } = useScrollPosition()

  return (
    <div className={cn('flex justify-between p-4 lg:hidden', scrollPosition > 20 ? 'bg-black' : 'bg-transparent')}>
      <LogoLink />
      <Sheet open={isMobileNavigationOpen} onOpenChange={setIsMobileNavigationOpen}>
        <SheetTrigger>
          <LuMenu className='size-6 cursor-pointer' />
        </SheetTrigger>
        <SheetContent className='flex flex-col justify-between lg:hidden'>
          <SheetHeader>
            <SheetTitle className='pt-4'>Menu</SheetTitle>
            <SheetDescription className='flex flex-col gap-4'>
              {navLinks.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className='border-t border-white pt-4'>
            <NavMenu />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
