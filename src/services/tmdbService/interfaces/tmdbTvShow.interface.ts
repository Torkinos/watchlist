import { TMDBResponse } from './tmdbResponse.interface'

export interface TMDBTvShow {
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export type TMDBTvShowsResponse = TMDBResponse<TMDBTvShow>
