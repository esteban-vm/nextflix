import { notFound } from 'next/navigation'
import { getCldImageUrl } from 'next-cloudinary'
import { LuInfo, LuPlay } from 'react-icons/lu'
import { MovieActions } from '@/actions'
import { FavoriteMovies } from '@/components/containers'
import { MovieCard, MovieCarousel, MovieItem } from '@/components/pages'
import { HomeUI as UI } from '@/components/styled'
import { Button } from '@/components/ui'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingResult = await MovieActions.findTrending()
  const trendingData = trendingResult?.data

  const playingResult = await MovieActions.findPlaying()
  const playingData = playingResult?.data

  if (!trendingData || !playingData) notFound()

  const videoUrl = getCldImageUrl({ src: 'nextflix/videos/video', assetType: 'video' })

  return (
    <>
      <UI.Page.HeroContainer>
        <UI.Page.BackgroundVideo src={videoUrl} autoPlay loop muted />
        <UI.Page.CTAContainer>
          <UI.Page.CTAContent>
            <UI.Page.HeroTitle>¡Bienvenido/a!</UI.Page.HeroTitle>
            <UI.Page.HeroSubtitle>¿Qué vamos a ver hoy?</UI.Page.HeroSubtitle>
            <UI.Page.CTAText>
              Aprende a crear desde cero un clon de Netflix con todas sus funciones clave, desde la gestión de usuarios
              hasta la reproducción de videos, mientras descubres los secretos detrás de una plataforma de streaming
              exitosa.
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
      {/* Trending Movies Section */}
      <UI.Page.SectionContainer>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle>Las series más populares hoy en tu país:</UI.Page.SectionTitle>
          <UI.Page.MovieList>
            {trendingData.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </UI.Page.MovieList>
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
      {/* Playing Movies Section */}
      <UI.Page.SectionContainer>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle>Películas más recientes:</UI.Page.SectionTitle>
          <MovieCarousel>
            {playingData.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </MovieCarousel>
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
      {/* Favorite Movies Section */}
      <UI.Page.SectionContainer>
        <UI.Page.SectionContent>
          <UI.Page.SectionTitle>Tus películas favoritas:</UI.Page.SectionTitle>
          <FavoriteMovies />
        </UI.Page.SectionContent>
      </UI.Page.SectionContainer>
    </>
  )
}
