'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import { FullImage } from '@/components/pages/common'
import { MovieCarouselUI } from '@/components/pages/home'
import { Carousel, CarouselNext, CarouselPrevious } from '@/components/ui'

export function MovieCarousel({ isMyList, movies = [] }: MovieCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 5_000 }))

  const playCarousel = () => {
    autoplay.current.play()
  }

  const stopCarousel = () => {
    autoplay.current.stop()
  }

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplay.current]}
      onPointerEnter={stopCarousel}
      onPointerLeave={playCarousel}
    >
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

                  <MovieCarouselUI.MovieInfo>
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
                    <MovieCarouselUI.MovieTitle>{title}</MovieCarouselUI.MovieTitle>
                  </MovieCarouselUI.MovieInfo>
                </MovieCarouselUI.StyledCardContent>
              </MovieCarouselUI.StyledCard>
            </MovieCarouselUI.StyledCarouselItem>
          )
        })}
      </MovieCarouselUI.StyledCarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export interface MovieCarouselProps {
  isMyList: boolean
  movies?: Models.PlayingMovie[]
}
