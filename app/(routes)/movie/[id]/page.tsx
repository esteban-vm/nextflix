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
  const result = await MovieActions.findOneById({ id: params.id })
  const movie = result?.data

  if (!movie) {
    return { title: 'Película no encontrada' }
  }

  return { title: movie.title }
}

export default async function MoviePage({ params }: MoviePageProps) {
  await verifySession()

  const result = await MovieActions.findOneById({ id: params.id })
  const movie = result?.data

  if (!movie) redirect('/')

  return (
    <UI.Page.PageContainer>
      <MoviePlayer movie={movie} />
    </UI.Page.PageContainer>
  )
}
