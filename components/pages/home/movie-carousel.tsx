'use client'

import type { CarouselApi } from '@/components/ui'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useRef, useState } from 'react'
import { FullImage } from '@/components/pages/common'
import { MovieCarouselUI } from '@/components/pages/home'
import { Carousel, CarouselNext, CarouselPrevious } from '@/components/ui'

export function MovieCarousel({ isMyList, movies = [] }: MovieCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  const autoplay = useRef(
    Autoplay({
      delay: 5_000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  )

  const scrollNext = useCallback(() => {
    if (!api) return
    api.scrollNext()
    autoplay.current.reset()
  }, [api])

  const scrollPrev = useCallback(() => {
    if (!api) return
    api.scrollPrev()
    autoplay.current.reset()
  }, [api])

  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setApi}>
      <MovieCarouselUI.StyledCarouselContent>
        {movies.map(({ id, title, placeholder, posterUrl }) => {
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
      <CarouselPrevious onClick={scrollPrev} />
      <CarouselNext onClick={scrollNext} />
    </Carousel>
  )
}

export interface MovieCarouselProps {
  isMyList?: boolean
  movies?: Models.PlayingMovie[]
}
