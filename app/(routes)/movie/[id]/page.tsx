import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { MovieActions } from '@/actions'
import { MoviePlayer } from '@/components/pages'
import { Movie } from '@/components/styled'
import { verifySession } from '@/lib/auth'

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const movieResult = await MovieActions.findOneById({ id: params.id })
  const movie = movieResult?.data

  if (!movie) {
    return { title: 'Película no encontrada' }
  }

  return { title: movie.title }
}

export default async function MoviePage({ params }: MoviePageProps) {
  await verifySession()

  const movieResult = await MovieActions.findOneById({ id: params.id })
  const movie = movieResult?.data

  if (!movie) redirect('/')

  return (
    <Movie.Page.PageContainer>
      <MoviePlayer movie={movie} />
    </Movie.Page.PageContainer>
  )
}
