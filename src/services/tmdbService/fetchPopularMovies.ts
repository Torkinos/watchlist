import { tmdbMovieToMovie } from '~/utils/tmdbMovieToMovie'
import { tmdbService, TMDB_BASE_PARAMS } from '.'
import { TMDBMoviesResponse } from './interfaces/tmdbmovie.interface'
import { WatchlistItem } from '../interfaces/watchlistItem.interface'

export const fetchPopularMovies = async (): Promise<WatchlistItem[]> => {
  const params = new URLSearchParams({
    ...TMDB_BASE_PARAMS,
  })

  const popularMovies = await tmdbService.get<TMDBMoviesResponse>(
    `/movie/popular?${params}`
  )

  return popularMovies.data.results.map((movie) => tmdbMovieToMovie(movie))
}
