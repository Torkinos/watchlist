import { tmdbTvShowToTvShow } from '~/utils/tmdbTvShowToTvShow'
import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBTvShowsResponse } from './interfaces/tmdbTvShow.interface'

export const fetchPopularTvShows = async () => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
  })

  const popularTvShows = await tmdbService.get<TMDBTvShowsResponse>(
    `/tv/popular?${params}`
  )

  return popularTvShows.data.results.map((tvShow) => tmdbTvShowToTvShow(tvShow))
}
