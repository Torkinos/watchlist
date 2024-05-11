import axios from 'axios'

export const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export const TMDB_BASE_PARAMS = {
  api_key: process.env.TMDB_API_KEY!,
  language: 'en-US',
  page: '1',
}
