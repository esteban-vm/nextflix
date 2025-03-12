import { getPlaceholderImage } from '@/lib/images'

export async function toListWithPlaceholders<T extends Models.WithImage[]>(list: T) {
  const listWithPlaceholders: Utils.WithPlaceholder<T[number]>[] = await Promise.all(
    list.map(async (item): Promise<Utils.WithPlaceholder<T[number]>> => {
      const poster = (item as Models.PlayingMovie | Models.TrendingMovie satisfies Models.WithImage).posterUrl
      const avatar = (item as Models.Profile satisfies Models.WithImage).avatarUrl
      const src = poster ?? avatar

      return {
        ...item,
        placeholder: await getPlaceholderImage(src),
      }
    })
  )

  return listWithPlaceholders
}

export function toPlayingMovie({ type: _, rankingUrl: __, ...rest }: Models.Movie): Models.PlayingMovie {
  return <Models.PlayingMovie>{ ...rest }
}

export function toTrendingMovie({ type: _, ...rest }: Models.Movie): Models.TrendingMovie {
  return <Models.TrendingMovie>{ ...rest }
}
