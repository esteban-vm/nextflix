import { LuInfo, LuPlay } from 'react-icons/lu'
import { MovieActions } from '@/actions'
import { FavoriteMovieList, PlayingMovieList } from '@/components/containers'
import { MovieCard } from '@/components/pages'
import { HomeUI as UI } from '@/components/styled'
import { Button } from '@/components/ui'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingResults = await MovieActions.findTrending()
  const trendingMovies = trendingResults?.data ?? []

  return (
    <>
      <UI.Page.HeroContainer>
        <UI.Page.BackgroundVideo src='/videos/video.mp4' autoPlay loop muted />
        <UI.Page.CTAContainer>
          <UI.Page.CTAContent>
            <UI.Page.HeroTitle>Test</UI.Page.HeroTitle>
            <UI.Page.CTAText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptas ab debitis deserunt sit! Enim
              autem voluptatibus itaque, repellat quia est maxime minima possimus voluptas fugiat tempora officiis,
              illum nesciunt!
            </UI.Page.CTAText>
            <UI.Page.ButtonGroup>
              <Button>
                <LuPlay className='fill-black' />
                &nbsp;Reproducir
              </Button>
              <Button variant='secondary'>
                <LuInfo />
                &nbsp;Más Información
              </Button>
            </UI.Page.ButtonGroup>
          </UI.Page.CTAContent>
        </UI.Page.CTAContainer>
        <UI.Page.BackgroundGradient />
      </UI.Page.HeroContainer>
      {/* Trending Section */}
      <UI.Page.SectionContainer aria-labelledby='trending-movies'>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle id='trending-movies'>Las series más populares hoy en tu país:</UI.Page.SectionTitle>
          <UI.Page.MovieList>
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </UI.Page.MovieList>
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
      {/* Playing Section */}
      <UI.Page.SectionContainer>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle>Películas más recientes:</UI.Page.SectionTitle>
          <PlayingMovieList />
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
      {/* Favorite Section */}
      <UI.Page.SectionContainer>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle>Tus películas favoritas:</UI.Page.SectionTitle>
          <FavoriteMovieList />
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
    </>
  )
}
