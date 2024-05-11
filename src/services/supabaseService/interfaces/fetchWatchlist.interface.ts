import { WatchlistItem } from '~/services/interfaces/watchlistItem.interface'

export interface FetchWatchListResponse {
  data: WatchlistItem[]
}

export interface FetchWatchListParams {
  searchPattern?: string
}
