import { WatchListType } from '~/app/api/movies-tv/watchlist/enums/watchListType.enum'
import { WatchlistItem } from '~/services/interfaces/watchlistItem.interface'
import { TMDBMovie } from '~/services/tmdbService/interfaces/tmdbmovie.interface'

export const tmdbMovieToMovie = (tmdbMovie: TMDBMovie): WatchlistItem => {
  return {
    createdAt: undefined,
    genreIds: tmdbMovie.genre_ids.map(String),
    id: undefined,
    posterPath: tmdbMovie.poster_path,
    rating: tmdbMovie.vote_average,
    releaseDate: tmdbMovie.release_date,
    title: tmdbMovie.title,
    tmdbId: String(tmdbMovie.id),
    type: WatchListType.MOVIE,
    status: undefined,
  }
}
