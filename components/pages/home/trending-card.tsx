'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import { TrendingCardUI } from '@/components/pages/home/styled'
import { rankings } from '@/lib/constants'
import { cn } from '@/lib/utils'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading({ isLoading, error }) {
    if (error) return <span className='text-destructive'>{error.message}</span>
    if (isLoading) return <TrendingCardUI.LoadingSpinner aria-label='Indicador de carga' />
    return null
  },
})

export function TrendingCard({ movie }: Props.WithTrendingMovie) {
  const [isShowingInfo, setIsShowingInfo] = useState(false)
  const { age, duration, genres, placeholder, ranking, thumbnail, title, trailer } = movie

  return (
    <TrendingCardUI.CardContainer>
      <TrendingCardUI.SideLeft>
        <Image
          alt='Puntuación'
          blurDataURL={placeholder}
          placeholder='blur'
          src={ranking ? rankings[ranking] : ''}
          fill
        />
      </TrendingCardUI.SideLeft>
      <TrendingCardUI.SideRight>
        <Image
          alt={`Portada de "${title}"`}
          blurDataURL={placeholder}
          className='contrast-125'
          placeholder='blur'
          src={thumbnail}
          fill
        />
      </TrendingCardUI.SideRight>
      <TrendingCardUI.VideoInfo>
        <TrendingCardUI.PlayerContainer>
          <ReactPlayer height='100%' url={trailer} width='100%' loop muted playing />
        </TrendingCardUI.PlayerContainer>
        <TrendingCardUI.FlexContainer $isBetween>
          <TrendingCardUI.MovieTitle>{title}</TrendingCardUI.MovieTitle>
          <TrendingCardUI.FlexContainer>
            <TrendingCardUI.StyledButton size='icon' title='Reproducir' variant='ghost'>
              <TrendingCardUI.IconPlay />
            </TrendingCardUI.StyledButton>
            <TrendingCardUI.StyledButton
              size='icon'
              title={`${isShowingInfo ? 'Menos' : 'Más'} información`}
              variant='ghost'
              onClick={() => setIsShowingInfo(!isShowingInfo)}
            >
              {isShowingInfo ? <TrendingCardUI.IconUp /> : <TrendingCardUI.IconDown />}
            </TrendingCardUI.StyledButton>
          </TrendingCardUI.FlexContainer>
        </TrendingCardUI.FlexContainer>
        <div className={cn(isShowingInfo ? 'mt-1 block' : 'hidden')}>
          <div className='mb-1'>
            <TrendingCardUI.StyledBadge variant='outline'>HD</TrendingCardUI.StyledBadge>
            <TrendingCardUI.StyledBadge variant='secondary' $isMiddle>
              {duration}
            </TrendingCardUI.StyledBadge>
            <TrendingCardUI.StyledBadge variant={age >= 18 ? 'destructive' : 'default'}>
              +{age}
            </TrendingCardUI.StyledBadge>
          </div>
          <div>
            {genres.map((genre, index) => (
              <TrendingCardUI.StyledBadge key={genre} $isMiddle={index % 2 === 1} variant='outline'>
                {genre}
              </TrendingCardUI.StyledBadge>
            ))}
          </div>
        </div>
      </TrendingCardUI.VideoInfo>
    </TrendingCardUI.CardContainer>
  )
}
