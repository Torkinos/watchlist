import { WatchListType } from '~/app/api/movies-tv/watchlist/enums/watchListType.enum'
import { WatchlistItem } from '~/services/interfaces/watchlistItem.interface'
import { TMDBTvShow } from '~/services/tmdbService/interfaces/tmdbTvShow.interface'

export const tmdbTvShowToTvShow = (tmdbTvShow: TMDBTvShow): WatchlistItem => {
  return {
    createdAt: undefined,
    genreIds: tmdbTvShow.genre_ids.map(String),
    id: undefined,
    posterPath: tmdbTvShow.poster_path,
    rating: tmdbTvShow.vote_average,
    releaseDate: tmdbTvShow.first_air_date,
    title: tmdbTvShow.name,
    tmdbId: String(tmdbTvShow.id),
    type: WatchListType.TV_SHOW,
    status: undefined,
  }
}
