import { LuInfo, LuPlay } from 'react-icons/lu'
import { MovieActions } from '@/actions'
import { HomeUI } from '@/components/pages'
import { Button } from '@/components/ui'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingResults = await MovieActions.findTrending()
  const trendingMovies = trendingResults?.data ?? []

  const playingResults = await MovieActions.findPlaying()
  const playingMovies = playingResults?.data ?? []

  return (
    <>
      <HomeUI.HeroContainer>
        <HomeUI.BackgroundVideo src='/videos/video1.mp4' autoPlay loop muted />
        <HomeUI.CTAContainer>
          <HomeUI.CTAContent>
            <HomeUI.HeroTitle>Test</HomeUI.HeroTitle>
            <HomeUI.CTAText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptas ab debitis deserunt sit! Enim
              autem voluptatibus itaque, repellat quia est maxime minima possimus voluptas fugiat tempora officiis,
              illum nesciunt!
            </HomeUI.CTAText>
            <HomeUI.ButtonGroup>
              <Button>
                <LuPlay className='fill-black' />
                &nbsp;Reproducir
              </Button>
              <Button variant='secondary'>
                <LuInfo />
                &nbsp;Más Información
              </Button>
            </HomeUI.ButtonGroup>
          </HomeUI.CTAContent>
        </HomeUI.CTAContainer>
        <HomeUI.BackgroundGradient />
      </HomeUI.HeroContainer>
      <HomeUI.MovieListContainer>
        <HomeUI.MovieListContent>
          <HomeUI.MovieListTitle>Las series más populares hoy en tu país:</HomeUI.MovieListTitle>
          <HomeUI.TrendingList>
            {trendingMovies.map((movie) => (
              <HomeUI.TrendingCard key={movie.id} movie={movie} />
            ))}
          </HomeUI.TrendingList>
        </HomeUI.MovieListContent>
      </HomeUI.MovieListContainer>
      <HomeUI.MovieListContainer>
        <HomeUI.MovieListContent>
          <HomeUI.MovieListTitle>Películas más recientes:</HomeUI.MovieListTitle>
          <HomeUI.MovieCarousel isMyList={Math.random() < 0.5} movies={playingMovies} />
        </HomeUI.MovieListContent>
      </HomeUI.MovieListContainer>
    </>
  )
}
