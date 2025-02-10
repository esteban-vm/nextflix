import { MovieActions } from '@/actions'
import { HomeUI } from '@/components/pages'
import { verifySession } from '@/lib/auth'

export default async function HomePage() {
  await verifySession()

  const trendingMovies = await MovieActions.findTrending()
  const playingMovies = await MovieActions.findPlaying()

  console.log({ trendingMovies: trendingMovies?.data })
  console.log({ playingMovies: playingMovies?.data })

  return (
    <HomeUI.PageWrapper>
      <HomeUI.BackgroundVideo />
      <HomeUI.InnerWrapper>
        <HomeUI.PageTitle>Test</HomeUI.PageTitle>
        <HomeUI.MainText />
        <HomeUI.ButtonWrapper>
          <HomeUI.PlayButton />
          <HomeUI.InfoButton />
        </HomeUI.ButtonWrapper>
      </HomeUI.InnerWrapper>
      <HomeUI.BackgroundGradient />
    </HomeUI.PageWrapper>
  )
}
