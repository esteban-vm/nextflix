'use client'

import type { CarouselApi } from '@/components/ui'
import Autoplay from 'embla-carousel-autoplay'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useRef, useState } from 'react'
import { MovieActions } from '@/actions'
import { FullImage } from '@/components/pages/common'
import { MovieItemUI } from '@/components/pages/home'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui'
import { toast } from '@/hooks'

export function MovieCarousel({ children }: Props.WithChildren) {
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
      <CarouselContent className='-ml-1 active:cursor-grabbing'>{children}</CarouselContent>
      <CarouselPrevious onClick={scrollPrev} />
      <CarouselNext onClick={scrollNext} />
    </Carousel>
  )
}

export function MovieItem({ movie, isFavorite }: MovieItemProps) {
  const { id, title, placeholder, posterUrl } = movie

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

  return (
    <MovieItemUI.ItemContainer id={id}>
      <MovieItemUI.ItemCard>
        <MovieItemUI.ItemContent>
          <FullImage
            alt={`Imagen de "${title}"`}
            blurDataURL={placeholder}
            className='rounded-md contrast-125'
            src={posterUrl}
          />
          <MovieItemUI.MovieInfo>
            <MovieItemUI.ButtonGroup>
              <MovieItemUI.StyledButton size='icon' title='Reproducir' variant='ghost'>
                <MovieItemUI.IconPlay />
              </MovieItemUI.StyledButton>
              <MovieItemUI.StyledButton
                disabled={isFavorite ? isPendingDislike : isPendingLike}
                size='icon'
                title={isFavorite ? 'Eliminar de mis favoritos' : 'Agregar a mis favoritos'}
                variant='ghost'
                onClick={isFavorite ? () => dislike({ id }) : () => like({ id })}
              >
                {isFavorite ? <MovieItemUI.IconDelete /> : <MovieItemUI.IconAdd />}
              </MovieItemUI.StyledButton>
            </MovieItemUI.ButtonGroup>
            <MovieItemUI.MovieTitle>{title}</MovieItemUI.MovieTitle>
          </MovieItemUI.MovieInfo>
        </MovieItemUI.ItemContent>
      </MovieItemUI.ItemCard>
    </MovieItemUI.ItemContainer>
  )
}

export interface MovieItemProps {
  isFavorite?: boolean
  movie: Models.PlayingMovie
}
