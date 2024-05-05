import axios from 'axios'

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
