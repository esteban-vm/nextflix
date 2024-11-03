import { LuMenu, LuBellRing, LuSearch, LuUser } from 'react-icons/lu'
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
            <LuMenu className='size-6 cursor-pointer' />
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
            <SheetFooter className='mt-4 border-t border-white py-4 [&_svg]:size-5'>
              <div className='flex w-full justify-between'>
                <LuSearch />
                <LuBellRing />
                <LuUser />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
