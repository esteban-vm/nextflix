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
import { useMobileNav } from '@/hooks'
import { navLinks } from '@/lib/constants'

export function MobileNav() {
  const { isOpen, setIsOpen } = useMobileNav()

  return (
    <div className='lg:hidden'>
      <div className='flex justify-between p-4'>
        <LogoLink />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
    </div>
  )
}
