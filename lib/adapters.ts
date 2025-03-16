import { getPlaceholderImage } from '@/lib/images'

export async function toListWithPlaceholders<T extends Models.MovieOrProfileDB[]>(list: T) {
  const listWithPlaceholders: Utils.WithPlaceholder<T[number]>[] = await Promise.all(
    list.map(async (item): Promise<Utils.WithPlaceholder<T[number]>> => {
      const poster = (item as Models.MovieDB satisfies Models.MovieOrProfileDB).posterUrl
      const avatar = (item as Models.ProfileDB satisfies Models.MovieOrProfileDB).avatarUrl
      const src = poster ?? avatar

      return {
        ...item,
        placeholder: await getPlaceholderImage(src),
      }
    })
  )

  return listWithPlaceholders
}

export function toPlayingMovie(movie: Models.Movie): Models.PlayingMovie {
  const { type: _, rankingUrl: __, ...playingMovie } = movie
  return playingMovie as Models.PlayingMovie
}

export function toTrendingMovie(movie: Models.Movie): Models.TrendingMovie {
  const { type: _, ...trendingMovie } = movie
  return trendingMovie as Models.TrendingMovie
}
