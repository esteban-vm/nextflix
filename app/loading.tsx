import { LoadingSpinner } from '@/components/common'

export default function Loading() {
  return (
    <div className='relative h-screen w-full'>
      <div className='absolute left-1/2 top-1/2 size-fit -translate-x-1/2 -translate-y-1/2'>
        <LoadingSpinner className='~size-20/24' />
      </div>
    </div>
  )
}
