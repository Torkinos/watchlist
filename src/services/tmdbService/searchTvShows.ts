import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBItemResponse } from './interfaces/tmdbItem.interface'

export const searchTvShows = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get<TMDBItemResponse>(
    `/search/tv?${params}`
  )

  return searchResults.data
}
