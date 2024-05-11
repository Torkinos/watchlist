import axios from 'axios'
import { WatchlistItem } from '../interfaces/watchlistItem.interface'

export const addToWatchList = async (params: WatchlistItem) => {
  await axios.post(`/api/movies-tv/watchlist/${params.id}`, params)
}
