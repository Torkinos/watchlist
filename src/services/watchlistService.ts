import axios from 'axios'
import { Database } from '~/__generated__/supabase'
import { AddToWatchListBodyParams } from '~/app/api/movies-tv/watchlist/interfaces/watclist.interface'

interface FetchMoviesParams {
  searchPattern?: string
}

export const fetchMovies = async (params?: FetchMoviesParams): Promise<any> => {
  const omitedParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, value]) => value !== undefined)
  )

  const urlParams = new URLSearchParams(omitedParams)

  const response = await axios.get(`/api/movies-tv?${urlParams}`)

  return response.data
}

export const addToWatchList = async (
  id: number,
  params: AddToWatchListBodyParams
) => {
  await axios.post(`/api/movies-tv/watchlist/${id}`, params)
}

export const fetchWatchList = async () => {
  const response = await axios.get<
    Database['public']['Tables']['user_watchlist']['Row'][]
  >(`/api/movies-tv/watchlist`)

  return response.data
}
