import { LuMenu } from 'react-icons/lu'
import { AppLogo, NavLink } from '@/common'
import { NavIcons } from '@/containers'
import { navLinks } from '@/lib/constants'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/ui'

export function Mobile() {
  return (
    <div className='lg:hidden'>
      <div className='flex justify-between p-4'>
        <AppLogo />
        <Sheet>
          <SheetTrigger>
            <LuMenu className='size-6 cursor-pointer' />
          </SheetTrigger>
          <SheetContent className='lg:hidden'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className='flex flex-col gap-4'>
                {navLinks.map((link) => (
                  <NavLink key={link.name} {...link} />
                ))}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='mt-4 border-t border-white py-4'>
              <NavIcons />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
