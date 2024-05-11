import { tmdbTvShowToTvShow } from '~/utils/tmdbTvShowToTvShow'
import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBTvShowsResponse } from './interfaces/tmdbTvShow.interface'

export const searchTvShows = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get<TMDBTvShowsResponse>(
    `/search/tv?${params}`
  )

  return searchResults.data.results.map((tvShow) => tmdbTvShowToTvShow(tvShow))
}
