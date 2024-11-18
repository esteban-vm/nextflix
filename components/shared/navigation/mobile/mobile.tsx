'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { LuMenu, LuBellRing, LuSearch, LuUser, LuLogOut } from 'react-icons/lu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { useCurrentSession } from '@/hooks'
import { navigationItems } from '@/lib/constants'
import { Logo } from '@/shared/logo'
import { NavigationItem } from '@/shared/navigation-item'

export function Mobile() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useCurrentSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <div className='lg:hidden'>
      <div className='flex justify-between p-4'>
        <Logo />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <LuMenu className='size-6 cursor-pointer' />
          </SheetTrigger>
          <SheetContent className='lg:hidden'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className='flex flex-col gap-4'>
                {navigationItems.map((link) => (
                  <NavigationItem key={link.name} {...link} />
                ))}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='mt-4 border-t border-white py-4 [&_svg]:size-5'>
              <div className='flex w-full justify-between'>
                <LuSearch />
                {isAuthenticated && (
                  <>
                    <LuBellRing />
                    <LuUser />
                    <LuLogOut onClick={() => signOut({ redirectTo: '/' })} />
                  </>
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
