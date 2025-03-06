export function toPlayingMovie({ type: _, ranking: __, ...rest }: Models.Movie): Models.PlayingMovie {
  return <Models.PlayingMovie>{ ...rest }
}

export function toTrendingMovie({ type: _, ...rest }: Models.Movie): Models.TrendingMovie {
  return <Models.TrendingMovie>{ ...rest }
}
