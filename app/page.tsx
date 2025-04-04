import { LuInfo, LuPlay } from 'react-icons/lu'
import { FavoriteMovieActions, MovieActions } from '@/actions'
import { HomeUI } from '@/components/pages'
import { Button } from '@/components/ui'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingResults = await MovieActions.findTrending()
  const trendingMovies = trendingResults?.data ?? []

  const playingResults = await MovieActions.findPlaying()
  const playingMovies = playingResults?.data ?? []

  const favoriteResults = await FavoriteMovieActions.findAll()
  const favoriteMovies = favoriteResults?.data ?? []

  return (
    <>
      <HomeUI.HeroContainer>
        <HomeUI.BackgroundVideo src='/videos/video.mp4' autoPlay loop muted />
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
      {/* Trending Section */}
      <HomeUI.SectionContainer>
        <HomeUI.SectionContent>
          <HomeUI.SectionTitle>Las series más populares hoy en tu país:</HomeUI.SectionTitle>
          <HomeUI.MovieList>
            {trendingMovies.map((movie) => (
              <HomeUI.MovieCard key={movie.id} movie={movie} />
            ))}
          </HomeUI.MovieList>
        </HomeUI.SectionContent>
      </HomeUI.SectionContainer>
      {/* Playing Section */}
      <HomeUI.SectionContainer>
        <HomeUI.SectionContent>
          <HomeUI.SectionTitle>Películas más recientes:</HomeUI.SectionTitle>
          {playingMovies.length ? (
            <HomeUI.MovieCarousel>
              {playingMovies.map((movie) => (
                <HomeUI.MovieItem key={movie.id} movie={movie} />
              ))}
            </HomeUI.MovieCarousel>
          ) : (
            <HomeUI.MovieAlert>Sin resultados</HomeUI.MovieAlert>
          )}
        </HomeUI.SectionContent>
      </HomeUI.SectionContainer>
      {/* Favorite Section */}
      <HomeUI.SectionContainer>
        <HomeUI.SectionContent>
          <HomeUI.SectionTitle>Tus películas favoritas:</HomeUI.SectionTitle>
          {favoriteMovies.length ? (
            <HomeUI.MovieCarousel>
              {favoriteMovies.map((movie) => (
                <HomeUI.MovieItem key={movie.id} movie={movie} isFavorite />
              ))}
            </HomeUI.MovieCarousel>
          ) : (
            <HomeUI.MovieAlert>Aún no tienes películas favoritas</HomeUI.MovieAlert>
          )}
        </HomeUI.SectionContent>
      </HomeUI.SectionContainer>
    </>
  )
}
