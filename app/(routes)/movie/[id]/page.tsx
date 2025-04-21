import Image from 'next/image'
import { redirect } from 'next/navigation'
import { MovieActions } from '@/actions'
import { verifySession } from '@/lib/auth'
import { cn } from '@/lib/utils'

export default async function MoviePage({ params }: { params: { id: string } }) {
  await verifySession()

  const movieResult = await MovieActions.findOneById({ id: params.id })
  const movie = movieResult?.data

  if (!movie) redirect('/')

  const { title, posterUrl, placeholder, type } = movie

  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <span>Movie name: {title}</span>
      <div className={cn('relative w-80', type === 'playing' ? 'aspect-video' : 'aspect-[3/4]')}>
        <Image alt={title} blurDataURL={placeholder} placeholder='blur' src={posterUrl} fill />
      </div>
    </div>
  )
}
