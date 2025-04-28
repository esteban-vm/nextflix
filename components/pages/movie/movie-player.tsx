'use client'

import { useRouter } from 'next/navigation'
import { LoadingSpinner, ReactPlayer } from '@/components/common'
import { MovieUI as UI } from '@/components/styled'
import { randomize } from '@/lib/utils'

export function MoviePlayer({ movie }: MoviePlayerProps) {
  const { push } = useRouter()
  const { title, trailerUrl } = movie

  return (
    <UI.MoviePlayer.PlayerContainer>
      <UI.MoviePlayer.SideUp>
        <UI.MoviePlayer.StyledButton
          size='icon'
          title='Regresar a la página principal'
          variant='ghost'
          onClick={() => push('/', { scroll: false })}
        >
          <UI.MoviePlayer.IconArrow />
        </UI.MoviePlayer.StyledButton>
        <p className='grow'>
          Estás viendo: <span className='font-semibold'>{title}</span>
        </p>
        <UI.MoviePlayer.IconPopcorn />
      </UI.MoviePlayer.SideUp>
      <UI.MoviePlayer.SideDown>
        <ReactPlayer
          fallback={<LoadingSpinner className='~size-14/16' />}
          height='100%'
          light={`/images/thumbnails/thumbnail${randomize()}.webp`}
          url={trailerUrl}
          volume={0.5}
          width='100%'
          controls
        />
      </UI.MoviePlayer.SideDown>
    </UI.MoviePlayer.PlayerContainer>
  )
}

export interface MoviePlayerProps {
  movie: Models.Movie
}
