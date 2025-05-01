'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FullImage, LoadingSpinner } from '@/components/common'
import { HomeUI as UI } from '@/components/styled'
import { cn } from '@/lib/utils'

const CldVideoPlayer = dynamic(() => import('next-cloudinary').then((mod) => mod.CldVideoPlayer), {
  ssr: false,
  loading() {
    return <LoadingSpinner className='~size-10/12' />
  },
})

export function MovieCard({ movie }: MovieCardProps) {
  const { push } = useRouter()
  const [isShowingInfo, setIsShowingInfo] = useState(false)
  const { id, age, duration, genres, placeholder, rankingUrl, posterUrl, title, trailerUrl } = movie

  return (
    <UI.MovieCard.CardContainer>
      <UI.MovieCard.SideLeft>
        {rankingUrl && <FullImage alt={`Puntuación de "${title}"`} src={rankingUrl} noBlur />}
      </UI.MovieCard.SideLeft>
      <UI.MovieCard.SideRight>
        <FullImage alt={`Portada de "${title}"`} blurDataURL={placeholder} src={posterUrl} />
      </UI.MovieCard.SideRight>
      <UI.MovieCard.VideoInfo>
        <UI.MovieCard.PlayerContainer>
          <CldVideoPlayer controls={false} id={id} src={trailerUrl} autoplay loop muted />
        </UI.MovieCard.PlayerContainer>
        <UI.MovieCard.FlexContainer $isBetween>
          <UI.MovieCard.MovieTitle>{title}</UI.MovieCard.MovieTitle>
          <UI.MovieCard.FlexContainer>
            <UI.MovieCard.StyledButton
              size='icon'
              title='Reproducir'
              variant='ghost'
              onClick={() => push(`/movie/${id}`)}
            >
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
