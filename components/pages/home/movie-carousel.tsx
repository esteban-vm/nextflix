'use client'

import { FullImage } from '@/components/pages/common'
import { MovieCarouselUI } from '@/components/pages/home'
import { CarouselNext, CarouselPrevious } from '@/components/ui'

export function MovieCarousel({ isMyList, movies }: MovieCarouselProps) {
  return (
    <MovieCarouselUI.StyledCarousel>
      <MovieCarouselUI.StyledCarouselContent>
        {movies.map((movie) => {
          const { id, title, placeholder, posterUrl } = movie

          return (
            <MovieCarouselUI.StyledCarouselItem key={id}>
              <MovieCarouselUI.StyledCard>
                <MovieCarouselUI.StyledCardContent>
                  <FullImage
                    alt={`Imagen de "${title}"`}
                    blurDataURL={placeholder}
                    className='rounded-md contrast-125'
                    src={posterUrl}
                  />
                  <MovieCarouselUI.ButtonGroup>
                    <MovieCarouselUI.StyledButton size='icon' title='Reproducir' variant='ghost'>
                      <MovieCarouselUI.IconPlay />
                    </MovieCarouselUI.StyledButton>
                    <MovieCarouselUI.StyledButton
                      size='icon'
                      title={isMyList ? 'Eliminar de mi lista' : 'Agregar a mi lista'}
                      variant='ghost'
                    >
                      {isMyList ? <MovieCarouselUI.IconDelete /> : <MovieCarouselUI.IconAdd />}
                    </MovieCarouselUI.StyledButton>
                  </MovieCarouselUI.ButtonGroup>
                </MovieCarouselUI.StyledCardContent>
              </MovieCarouselUI.StyledCard>
            </MovieCarouselUI.StyledCarouselItem>
          )
        })}
      </MovieCarouselUI.StyledCarouselContent>
      <CarouselPrevious className='hidden lg:flex' />
      <CarouselNext className='hidden lg:flex' />
    </MovieCarouselUI.StyledCarousel>
  )
}

export interface MovieCarouselProps {
  isMyList: boolean
  movies: Models.PlayingMovie[]
}
