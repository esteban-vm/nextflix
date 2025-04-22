import { redirect } from 'next/navigation'
import { MovieActions } from '@/actions'
import { MoviePlayer } from '@/components/pages'
import { Movie } from '@/components/styled'
import { verifySession } from '@/lib/auth'

export default async function MoviePage({ params }: { params: { id: string } }) {
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
