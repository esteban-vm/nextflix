export function BackgroundGradient() {
  return <div className='absolute bottom-0 top-auto h-[15vw] w-full bg-gradient-to-t from-background' />
}

export function BackgroundVideo() {
  return <video className='absolute size-full object-fill brightness-50' src='/videos/video1.mp4' autoPlay loop muted />
}
