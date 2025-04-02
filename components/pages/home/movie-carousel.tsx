'use client'

import type { CarouselApi } from '@/components/ui'
import Autoplay from 'embla-carousel-autoplay'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useRef, useState } from 'react'
import { MovieActions } from '@/actions'
import { FullImage } from '@/components/pages/common'
import { MovieCarouselUI } from '@/components/pages/home'
import { Carousel, CarouselNext, CarouselPrevious } from '@/components/ui'
import { toast } from '@/hooks'

export function MovieCarousel({ isFavorite, movies = [] }: MovieCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  const autoplay = useRef(
    Autoplay({
      delay: 5_000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  )

  const {
    execute: like,
    reset: resetLike,
    isPending: isPendingLike,
  } = useAction(MovieActions.createFavorite, {
    onSuccess() {
      toast({ title: 'Película añadida correctamente a tus favoritos' })
    },
    onError({ error }) {
      const title = error.validationErrors?._errors?.[0] ?? error.serverError
      toast({ title, variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Añadiendo película a tus favoritos', description: 'Un momento…' })
    },
    onSettled() {
      resetLike()
    },
  })

  const {
    execute: dislike,
    reset: resetDislike,
    isPending: isPendingDislike,
  } = useAction(MovieActions.deleteFavorite, {
    onSuccess() {
      toast({ title: 'Película eliminada correctamente de tus favoritos' })
    },
    onError() {
      toast({ title: 'Error al eliminar favorito', variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Eliminando película de tus favoritos', description: 'Un momento…' })
    },
    onSettled() {
      resetDislike()
    },
  })

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
                        disabled={isFavorite ? isPendingDislike : isPendingLike}
                        size='icon'
                        title={isFavorite ? 'Eliminar de mis favoritos' : 'Agregar a mis favoritos'}
                        variant='ghost'
                        onClick={isFavorite ? () => dislike({ id }) : () => like({ id })}
                      >
                        {isFavorite ? <MovieCarouselUI.IconDelete /> : <MovieCarouselUI.IconAdd />}
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
  isFavorite?: boolean
  movies?: Models.PlayingMovie[]
}
