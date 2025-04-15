'use client'

import type { CarouselApi } from '@/components/ui'
import Autoplay from 'embla-carousel-autoplay'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FavoriteMovieActions } from '@/actions'
import { FullImage } from '@/components/common'
import { Home as UI } from '@/components/styled'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui'
import { toast, useCurrentProfile, useUIStore } from '@/hooks'

export function MovieCarousel({ children }: Props.WithChildren) {
  const [api, setApi] = useState<CarouselApi>()
  const { shouldScrollCarouselIntoView, setShouldScrollCarouselIntoView } = useUIStore()

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

  const scrollIntoView = useCallback(async () => {
    if (api && shouldScrollCarouselIntoView) {
      api.containerNode().scrollIntoView({ block: 'end', behavior: 'smooth' })
      await new Promise((resolve) => setTimeout(resolve, 1_500))
      setShouldScrollCarouselIntoView(false)
    }
  }, [api, setShouldScrollCarouselIntoView, shouldScrollCarouselIntoView])

  useEffect(() => {
    scrollIntoView()
  }, [scrollIntoView])

  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setApi}>
      <CarouselContent className='-ml-1 active:cursor-grabbing'>{children}</CarouselContent>
      <CarouselPrevious className='hidden lg:flex' onClick={scrollPrev} />
      <CarouselNext className='hidden lg:flex' onClick={scrollNext} />
    </Carousel>
  )
}

export function MovieItem({ movie, isFavorite }: MovieItemProps) {
  const { currentProfile } = useCurrentProfile()
  const { setShouldScrollCarouselIntoView, setShouldRenderFavoriteMovies } = useUIStore()
  const { id, title, placeholder, posterUrl } = movie

  const {
    execute: like,
    reset: resetLike,
    isPending: isPendingLike,
  } = useAction(FavoriteMovieActions.createOne, {
    onSuccess({ data }) {
      setShouldRenderFavoriteMovies(true)
      toast({ title: `La película "${data?.movie.title}" ha sido añadida a tus favoritos` })
    },
    onError({ error }) {
      toast({ title: error.validationErrors?._errors?.[0], variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Añadiendo película a tus favoritos', description: 'Un momento…' })
    },
    onSettled() {
      resetLike()
      setShouldScrollCarouselIntoView(true)
    },
  })

  const {
    execute: dislike,
    reset: resetDislike,
    isPending: isPendingDislike,
  } = useAction(FavoriteMovieActions.deleteOne, {
    onSuccess({ data }) {
      setShouldRenderFavoriteMovies(true)
      toast({ title: `La película "${data?.movie.title}" ha sido eliminada de tus favoritos` })
    },
    onError({ error }) {
      toast({ title: error.serverError, variant: 'destructive' })
    },
    onExecute() {
      toast({ title: 'Eliminando película de tus favoritos', description: 'Un momento…' })
    },
    onSettled() {
      resetDislike()
    },
  })

  const onLikeMovie = () => {
    if (!currentProfile) return
    like({ movieId: id, profileId: currentProfile.id })
  }

  const onDislikeMovie = () => {
    if (!currentProfile) return
    dislike({ movieId: id, profileId: currentProfile.id })
  }

  return (
    <UI.MovieItem.ItemContainer>
      <UI.MovieItem.ItemCard>
        <UI.MovieItem.ItemContent>
          <FullImage
            alt={`Imagen de "${title}"`}
            blurDataURL={placeholder}
            className='rounded-md contrast-125'
            src={posterUrl}
          />
          <UI.MovieItem.MovieInfo>
            <UI.MovieItem.ButtonGroup>
              <UI.MovieItem.StyledButton size='icon' title='Reproducir' variant='ghost'>
                <UI.MovieItem.IconPlay />
              </UI.MovieItem.StyledButton>
              <UI.MovieItem.StyledButton
                disabled={isFavorite ? isPendingDislike : isPendingLike}
                size='icon'
                title={isFavorite ? 'Eliminar de mis favoritos' : 'Agregar a mis favoritos'}
                variant='ghost'
                onClick={isFavorite ? onDislikeMovie : onLikeMovie}
              >
                {isFavorite ? <UI.MovieItem.IconDelete /> : <UI.MovieItem.IconAdd />}
              </UI.MovieItem.StyledButton>
            </UI.MovieItem.ButtonGroup>
            <UI.MovieItem.MovieTitle>{title}</UI.MovieItem.MovieTitle>
          </UI.MovieItem.MovieInfo>
        </UI.MovieItem.ItemContent>
      </UI.MovieItem.ItemCard>
    </UI.MovieItem.ItemContainer>
  )
}

export interface MovieItemProps {
  isFavorite?: boolean
  movie: Models.PlayingMovie
}
