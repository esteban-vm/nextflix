import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { MovieActions } from '@/actions'
import { MoviePlayer } from '@/components/pages'
import { MovieUI as UI } from '@/components/styled'
import { verifySession } from '@/lib/auth'

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const movieResult = await MovieActions.findOneById({ id: params.id })
  const movieData = movieResult?.data

  if (!movieData) {
    return { title: 'Película no encontrada' }
  }

  return { title: movieData.title }
}

export default async function MoviePage({ params }: MoviePageProps) {
  await verifySession()

  const movieResult = await MovieActions.findOneById({ id: params.id })
  const movieData = movieResult?.data

  if (!movieData) redirect('/')

  return (
    <UI.Page.PageContainer>
      <MoviePlayer movie={movieData} />
    </UI.Page.PageContainer>
  )
}
