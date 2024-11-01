import { Menu, BellRing, Search, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { navigationItems } from '@/lib/constants'
import { Logo } from '@/shared/logo'
import { NavigationItem } from '@/shared/navigation-item'

export function Mobile() {
  return (
    <div className='md:hidden'>
      <div className='flex justify-between p-4'>
        <Logo />
        <Sheet>
          <SheetTrigger>
            <Menu className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className='flex flex-col gap-4'>
                {navigationItems.map((link) => (
                  <NavigationItem key={link.name} {...link} />
                ))}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='mt-4 border-t border-white py-4 [&_svg]:cursor-pointer'>
              <div className='flex w-full justify-between'>
                <Search />
                <BellRing />
                <User />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
