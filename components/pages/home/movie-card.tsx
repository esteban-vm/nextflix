'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { LoadingSpinner, FullImage } from '@/components/common'
import { HomeUI as UI } from '@/components/styled'
import { rankingPlaceholder } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function MovieCard({ movie }: MovieCardProps) {
  const [isShowingInfo, setIsShowingInfo] = useState(false)
  const { age, duration, genres, placeholder, rankingUrl, posterUrl, title, trailerUrl } = movie

  return (
    <UI.MovieCard.CardContainer>
      <UI.MovieCard.SideLeft>
        <FullImage alt={`Puntuación de "${title}"`} blurDataURL={rankingPlaceholder} src={rankingUrl ?? ''} />
      </UI.MovieCard.SideLeft>
      <UI.MovieCard.SideRight>
        <FullImage alt={`Portada de "${title}"`} blurDataURL={placeholder} className='contrast-125' src={posterUrl} />
      </UI.MovieCard.SideRight>
      <UI.MovieCard.VideoInfo>
        <UI.MovieCard.PlayerContainer>
          <ReactPlayer height='100%' url={trailerUrl} width='100%' loop muted playing />
        </UI.MovieCard.PlayerContainer>
        <UI.MovieCard.FlexContainer $isBetween>
          <UI.MovieCard.MovieTitle>{title}</UI.MovieCard.MovieTitle>
          <UI.MovieCard.FlexContainer>
            <UI.MovieCard.StyledButton size='icon' title='Reproducir' variant='ghost'>
              <UI.MovieCard.IconPlay />
            </UI.MovieCard.StyledButton>
            <UI.MovieCard.StyledButton
              size='icon'
              title={`${isShowingInfo ? 'Menos' : 'Más'} información`}
              variant='ghost'
              onClick={() => setIsShowingInfo(!isShowingInfo)}
            >
              {isShowingInfo ? <UI.MovieCard.IconUp /> : <UI.MovieCard.IconDown />}
            </UI.MovieCard.StyledButton>
          </UI.MovieCard.FlexContainer>
        </UI.MovieCard.FlexContainer>
        <div className={cn(isShowingInfo ? 'mt-1 block' : 'hidden')}>
          <div className='mb-1'>
            <UI.MovieCard.StyledBadge variant='outline'>HD</UI.MovieCard.StyledBadge>
            <UI.MovieCard.StyledBadge variant='secondary' $isMiddle>
              {duration}
            </UI.MovieCard.StyledBadge>
            <UI.MovieCard.StyledBadge variant={age >= 18 ? 'destructive' : 'default'}>+{age}</UI.MovieCard.StyledBadge>
          </div>
          <div>
            {genres.map((genre, index) => (
              <UI.MovieCard.StyledBadge key={genre} $isMiddle={index % 2 === 1} variant='outline'>
                {genre}
              </UI.MovieCard.StyledBadge>
            ))}
          </div>
        </div>
      </UI.MovieCard.VideoInfo>
    </UI.MovieCard.CardContainer>
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
