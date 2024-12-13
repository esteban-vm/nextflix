import { LuInfo, LuPlay } from 'react-icons/lu'
import { checkUserSession } from '@/lib/auth'
import { Button } from '@/ui'

export default async function HomePage() {
  await checkUserSession()

  return (
    <div className='relative h-[90vw] md:h-[56.25vw] lg:h-[45vw]'>
      <video className='absolute size-full object-fill brightness-50' src='/videos/video1.mp4' autoPlay loop muted />
      <div className='absolute inset-x-0 top-full z-20 -translate-y-full md:top-1/2 md:-translate-y-1/2'>
        <div className='mx-auto w-full max-w-screen-2xl p-4 2xl:p-0'>
          <h2 className='font-geist-mono font-bold tracking-tighter drop-shadow-xl ~text-3xl/7xl'>Test</h2>
          <p className='mt-2 line-clamp-4 max-w-md text-balance'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptas ab debitis deserunt sit! Enim
            autem voluptatibus itaque, repellat quia est maxime minima possimus voluptas fugiat tempora officiis, illum
            nesciunt!
          </p>
          <div className='mt-5 flex flex-col gap-4 md:flex-row'>
            <Button>
              <LuPlay className='fill-black' />
              &nbsp;Reproducir
            </Button>
            <Button variant='secondary'>
              <LuInfo />
              &nbsp;Más Información
            </Button>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 top-auto h-[15vw] w-full bg-gradient-to-t from-background' />
    </div>
  )
}
