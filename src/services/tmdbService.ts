import axios from 'axios'

const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export const fetchPopularMovies = async () => {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    language: 'en-US',
    page: '1',
  })

  const popularMovies = await tmdbService.get(`/movie/popular?${params}`)

  return popularMovies.data
}
