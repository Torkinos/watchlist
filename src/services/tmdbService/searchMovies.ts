import { tmdbMovieToMovie } from '~/utils/tmdbMovieToMovie'
import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBMoviesResponse } from './interfaces/tmdbmovie.interface'
import { WatchlistItem } from '../interfaces/watchlistItem.interface'

export const searchMovies = async (
  searchPattern: string
): Promise<WatchlistItem[]> => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get<TMDBMoviesResponse>(
    `/search/movie?${params}`
  )

  return searchResults.data.results.map((movie) => tmdbMovieToMovie(movie))
}
