import { useState } from 'react'
import { LuMenu } from 'react-icons/lu'
import { AppLogo, NavLink } from '@/common'
import { NavIcons } from '@/containers'
import { navLinks } from '@/lib/constants'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/ui'

export function Mobile() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMobile = () => setIsOpen(false)

  return (
    <div className='lg:hidden'>
      <div className='flex justify-between p-4'>
        <AppLogo />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <LuMenu className='size-6 cursor-pointer' />
          </SheetTrigger>
          <SheetContent className='flex flex-col justify-between lg:hidden'>
            <SheetHeader>
              <SheetTitle className='pt-4'>Menu</SheetTitle>
              <SheetDescription className='flex flex-col gap-4'>
                {navLinks.map((link) => (
                  <NavLink key={link.name} onCloseMobile={closeMobile} {...link} />
                ))}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='border-t border-white pt-4'>
              <NavIcons onCloseMobile={closeMobile} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
