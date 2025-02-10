export function InnerWrapper({ children }: WithChildren) {
  return (
    <div className='absolute inset-x-0 top-full z-20 -translate-y-full md:top-1/2 md:-translate-y-1/2'>
      <div className='mx-auto w-full max-w-screen-2xl p-4 2xl:p-0'>{children}</div>
    </div>
  )
}

export function MainText() {
  return (
    <p className='mt-2 line-clamp-4 max-w-md text-balance'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptas ab debitis deserunt sit! Enim autem
      voluptatibus itaque, repellat quia est maxime minima possimus voluptas fugiat tempora officiis, illum nesciunt!
    </p>
  )
}

export function PageTitle({ children }: WithChildren) {
  return <h2 className='font-geist-mono font-bold tracking-tighter drop-shadow-xl ~text-3xl/7xl'>{children} </h2>
}

export function PageWrapper({ children }: WithChildren) {
  return <div className='relative h-[90vw] md:h-[56.25vw] lg:h-[45vw]'>{children}</div>
}
