import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { WatchListType } from '~/app/api/movies-tv/watchlist/enums/watchListType.enum'

export interface WatchlistItem {
  createdAt?: string
  genreIds: string[]
  id?: number
  posterPath?: string
  rating?: number
  releaseDate?: string
  title?: string
  tmdbId?: string
  type?: WatchListType
  status?: WatchListStatus
}
