'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { LuChevronUpCircle, LuChevronDownCircle, LuPlayCircle } from 'react-icons/lu'
import { Badge, Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export function TrendingPlayer({ movie }: WithMovie) {
  const [isShowingInfo, setIsShowingInfo] = useState(false)
  const { age, duration, genres, title, trailer } = movie

  return (
    <div className='invisible absolute inset-x-0 top-1/2 -translate-y-1/2 scale-0 select-none rounded-md bg-primary-foreground p-1 opacity-0 transition-all delay-200 duration-700 group-hover:visible group-hover:scale-125 group-hover:opacity-100'>
      <div className='mb-1 aspect-video overflow-hidden rounded-md contrast-125'>
        <ReactPlayer height='100%' url={trailer} width='100%' loop muted playing />
      </div>
      <div className='flex items-center justify-between'>
        <span className='w-3/5 truncate text-sm font-semibold italic'>{title}</span>
        <div className='flex items-center'>
          <Button className='rounded-full ~size-7/8' size='icon' title='Reproducir' variant='ghost'>
            <LuPlayCircle className='!size-full stroke-rose-800' />
          </Button>
          <Button
            className='rounded-full ~size-7/8'
            size='icon'
            title={`${isShowingInfo ? 'Menos' : 'Más'} información`}
            variant='ghost'
            onClick={() => setIsShowingInfo(!isShowingInfo)}
          >
            {isShowingInfo ? (
              <LuChevronUpCircle className='!size-full stroke-secondary-foreground/50' />
            ) : (
              <LuChevronDownCircle className='!size-full stroke-secondary-foreground/50' />
            )}
          </Button>
        </div>
      </div>
      <div className={cn(isShowingInfo ? 'mt-1 block' : 'hidden')}>
        <p className='mb-1'>
          <Badge className='text-xs' variant='outline'>
            HD
          </Badge>
          <Badge className='mx-1 text-xs' variant='secondary'>
            {duration}
          </Badge>
          <Badge className='text-xs' variant={age >= 18 ? 'destructive' : 'default'}>
            +{age}
          </Badge>
        </p>
        <p>
          {genres.map((genre) => (
            <Badge key={genre} className='text-xs' variant='outline'>
              {genre}
            </Badge>
          ))}
        </p>
      </div>
    </div>
  )
}
