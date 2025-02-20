import Image from 'next/image'
import { rankings } from '@/lib/constants'

export function TrendingCard({ movie, children }: TrendingCardProps) {
  const { ranking, thumbnail, title } = movie

  return (
    <div className='group relative flex aspect-square ~h-44/52'>
      <div className='relative h-full w-1/3'>
        <Image alt='puntuación' src={ranking ? rankings[ranking] : ''} fill />
      </div>
      <div className='relative grow'>
        <Image alt={title} className='contrast-125' src={thumbnail} fill />
      </div>
      {children}
    </div>
  )
}

export interface TrendingCardProps extends WithMovie, WithChildren {}
