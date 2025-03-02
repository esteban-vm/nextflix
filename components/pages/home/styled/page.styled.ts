import tw from 'tailwind-styled-components'

export const BackgroundGradient = tw.div`

  absolute

  bottom-0

  top-auto

  h-[15vw]

  w-full

  bg-gradient-to-t

  from-background

`

export const BackgroundVideo = tw.video`

  absolute

  size-full

  object-fill

  brightness-50

`

export const ButtonGroup = tw.div`

  mt-5

  flex

  flex-col

  gap-4

  md:flex-row

`

export const CTAContainer = tw.div`

  absolute

  inset-x-0

  top-full

  z-20

  -translate-y-full

  md:top-1/2

  md:-translate-y-1/2

`

export const CTAContent = tw.div`

  mx-auto

  w-full

  max-w-screen-2xl

  p-4

  2xl:p-0

`

export const CTAText = tw.p`

  mt-2

  line-clamp-4

  max-w-md

  text-balance

`

export const HeroContainer = tw.header`

  relative

  h-[90vw]

  md:h-[56.25vw]

  lg:h-[45vw]

`

export const HeroTitle = tw.h1`

  font-geist-mono

  font-bold

  tracking-tighter

  drop-shadow-xl

  ~text-3xl/7xl

`

export const TrendingContainer = tw.section`

  w-full

  bg-background

  pb-5

`

export const TrendingContent = tw.div`

  container

  z-30

  mx-auto

  text-primary

`

export const TrendingList = tw.div`

  grid

  grid-cols-2

  place-items-center

  ~gap-2/4

  ~p-2/4

  lg:grid-cols-5

`

export const TrendingTitle = tw.h2`

  mb-4

  font-semibold

  ~text-lg/2xl

`
