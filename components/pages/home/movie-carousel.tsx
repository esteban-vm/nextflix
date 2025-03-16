import { FullImage } from '@/components/pages/common'
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui'

export function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <Carousel className='mx-auto w-[95%]' opts={{ loop: true }}>
      <CarouselContent className='py-4 active:cursor-grabbing'>
        {movies.map((movie) => {
          const { id, title, placeholder, posterUrl } = movie
          return (
            <CarouselItem key={id} className='md:basis-1/3 lg:basis-1/5'>
              <Card className='mx-auto aspect-video w-full max-w-64 cursor-pointer overflow-hidden border-2 border-secondary-foreground/50 transition-transform hover:scale-105'>
                <CardContent className='relative size-full'>
                  <FullImage
                    alt={`Imagen de "${title}"`}
                    blurDataURL={placeholder}
                    className='rounded-md contrast-125'
                    src={posterUrl}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export interface MovieCarouselProps {
  movies: Models.PlayingMovie[]
}
