'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { LoadingSpinner, FullImage } from '@/components/common'
import { MovieCardUI } from '@/components/pages/home/styled'
import { rankingPlaceholder } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function MovieCard({ movie }: MovieCardProps) {
  const [isShowingInfo, setIsShowingInfo] = useState(false)
  const { age, duration, genres, placeholder, rankingUrl, posterUrl, title, trailerUrl } = movie

  return (
    <MovieCardUI.CardContainer>
      <MovieCardUI.SideLeft>
        <FullImage alt={`Puntuación de "${title}"`} blurDataURL={rankingPlaceholder} src={rankingUrl ?? ''} />
      </MovieCardUI.SideLeft>
      <MovieCardUI.SideRight>
        <FullImage alt={`Portada de "${title}"`} blurDataURL={placeholder} className='contrast-125' src={posterUrl} />
      </MovieCardUI.SideRight>
      <MovieCardUI.VideoInfo>
        <MovieCardUI.PlayerContainer>
          <ReactPlayer height='100%' url={trailerUrl} width='100%' loop muted playing />
        </MovieCardUI.PlayerContainer>
        <MovieCardUI.FlexContainer $isBetween>
          <MovieCardUI.MovieTitle>{title}</MovieCardUI.MovieTitle>
          <MovieCardUI.FlexContainer>
            <MovieCardUI.StyledButton size='icon' title='Reproducir' variant='ghost'>
              <MovieCardUI.IconPlay />
            </MovieCardUI.StyledButton>
            <MovieCardUI.StyledButton
              size='icon'
              title={`${isShowingInfo ? 'Menos' : 'Más'} información`}
              variant='ghost'
              onClick={() => setIsShowingInfo(!isShowingInfo)}
            >
              {isShowingInfo ? <MovieCardUI.IconUp /> : <MovieCardUI.IconDown />}
            </MovieCardUI.StyledButton>
          </MovieCardUI.FlexContainer>
        </MovieCardUI.FlexContainer>
        <div className={cn(isShowingInfo ? 'mt-1 block' : 'hidden')}>
          <div className='mb-1'>
            <MovieCardUI.StyledBadge variant='outline'>HD</MovieCardUI.StyledBadge>
            <MovieCardUI.StyledBadge variant='secondary' $isMiddle>
              {duration}
            </MovieCardUI.StyledBadge>
            <MovieCardUI.StyledBadge variant={age >= 18 ? 'destructive' : 'default'}>+{age}</MovieCardUI.StyledBadge>
          </div>
          <div>
            {genres.map((genre, index) => (
              <MovieCardUI.StyledBadge key={genre} $isMiddle={index % 2 === 1} variant='outline'>
                {genre}
              </MovieCardUI.StyledBadge>
            ))}
          </div>
        </div>
      </MovieCardUI.VideoInfo>
    </MovieCardUI.CardContainer>
  )
}

export interface MovieCardProps {
  movie: Models.TrendingMovie
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading({ isLoading, error }) {
    if (error) return <span className='text-destructive'>{error.message}</span>
    if (isLoading) return <LoadingSpinner className='h-2/5' />
    return null
  },
})
