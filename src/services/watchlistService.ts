import axios from 'axios'
import { AddToWatchListBodyParams } from '~/app/api/movies-tv/[id]/watchlist/interfaces/watclist.interface'

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
  console.log('params', params, id)

  await axios.post(`/api/movies-tv/${id}/watchlist`, params)
}
