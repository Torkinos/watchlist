import axios from 'axios'

const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

const baseParams = {
  api_key: process.env.TMDB_API_KEY!,
  language: 'en-US',
  page: '1',
}

export const fetchPopularMovies = async () => {
  const params = new URLSearchParams({
    ...baseParams,
  })

  const popularMovies = await tmdbService.get(`/movie/popular?${params}`)

  return popularMovies.data
}

export const fetchPopularTvShows = async () => {
  const params = new URLSearchParams({
    ...baseParams,
  })

  const popularTvShows = await tmdbService.get(`/tv/popular?${params}`)

  return popularTvShows.data
}

export const searchMovies = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...baseParams,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get(`/search/movie?${params}`)

  return searchResults.data
}

export const searchTvShows = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...baseParams,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get(`/search/tv?${params}`)

  return searchResults.data
}
