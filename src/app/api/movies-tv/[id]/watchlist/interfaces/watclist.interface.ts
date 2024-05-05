import { WatchListStatus } from '../enums/watchListStatus.enum'
import { WatchListType } from '../enums/watchListType.enum'

export interface AddToWatchListBodyParams {
  status: WatchListStatus
  title: string
  posterPath: string
  releaseDate: string
  rating: number
  type: WatchListType
  genreIds: string[]
  tmdbId: number
}
