import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBItemResponse } from './interfaces/tmdbItem.interface'

export const fetchPopularTvShows = async () => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
  })

  const popularTvShows = await tmdbService.get<TMDBItemResponse>(
    `/tv/popular?${params}`
  )

  return popularTvShows.data
}
