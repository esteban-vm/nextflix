import { MovieActions } from '@/actions'
import { HomeUI } from '@/components/pages'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingMovieResults = await MovieActions.findTrending()
  const trendingMovies = trendingMovieResults?.data ?? []

  return (
    <>
      <HomeUI.Hero>
        <HomeUI.BackgroundVideo />
        <HomeUI.CTA>
          <HomeUI.CTATitle>Test</HomeUI.CTATitle>
          <HomeUI.CTAText />
          <HomeUI.ButtonWrapper>
            <HomeUI.PlayButton />
            <HomeUI.InfoButton />
          </HomeUI.ButtonWrapper>
        </HomeUI.CTA>
        <HomeUI.BackgroundGradient />
      </HomeUI.Hero>
      <HomeUI.Trending>
        <HomeUI.TrendingTitle>Las series más populares hoy en tu país:</HomeUI.TrendingTitle>
        <HomeUI.TrendingList>
          {trendingMovies.map((movie) => (
            <HomeUI.TrendingCard key={movie.id} movie={movie}>
              <HomeUI.TrendingPlayer movie={movie} />
            </HomeUI.TrendingCard>
          ))}
        </HomeUI.TrendingList>
      </HomeUI.Trending>
    </>
  )
}
