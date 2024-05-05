import axios from 'axios'

export interface TMDBMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface GetMoviesTvResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

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

  const popularMovies = await tmdbService.get<GetMoviesTvResponse>(
    `/movie/popular?${params}`
  )

  return popularMovies.data
}

export const fetchPopularTvShows = async () => {
  const params = new URLSearchParams({
    ...baseParams,
  })

  const popularTvShows = await tmdbService.get<GetMoviesTvResponse>(
    `/tv/popular?${params}`
  )

  return popularTvShows.data
}

export const searchMovies = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...baseParams,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get<GetMoviesTvResponse>(
    `/search/movie?${params}`
  )

  return searchResults.data
}

export const searchTvShows = async (searchPattern: string) => {
  const params = new URLSearchParams({
    ...baseParams,
    query: searchPattern,
  })

  const searchResults = await tmdbService.get<GetMoviesTvResponse>(
    `/search/tv?${params}`
  )

  return searchResults.data
}
