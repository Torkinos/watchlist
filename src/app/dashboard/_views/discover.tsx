'use client'

import { FC, useCallback } from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
import debounce from 'lodash.debounce'
import { useQueryParams } from '~/hooks/useQueryParams'
import { addToWatchList } from '~/services/watchlistService'
import { GetMoviesTvResponse, TMDBMovie } from '~/services/tmdbService'
import { WatchListType } from '~/app/api/movies-tv/watchlist/enums/watchListType.enum'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { QueryParams } from '../interfaces/queryParams.interfce'
import { SearchField } from '../_components/searchField'
import { MovieCard } from '../_components/MovieCard'

interface DiscoverProps {
  movies: GetMoviesTvResponse
}

export const Discover: FC<DiscoverProps> = ({ movies }) => {
  const { updateQueryParams, queryParams } = useQueryParams<QueryParams>()

  const onSearch = async (searchPattern: string) => {
    updateQueryParams({ search: searchPattern })
  }

  const handleChange = useCallback(
    debounce((value) => {
      onSearch(value)
    }, 500),
    []
  )

  const onAddToWatchList = async (
    movie: TMDBMovie,
    status: WatchListStatus
  ) => {
    await addToWatchList(movie.id, {
      status: status,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      type: WatchListType.MOVIE,
      genreIds: movie.genre_ids.map(String),
      tmdbId: movie.id,
    })
  }

  return (
    <div>
      <Flex justify="center">
        <Box
          width={{
            initial: '100%',
            md: '400px',
          }}
        >
          <SearchField onChange={handleChange} value={queryParams?.search} />
        </Box>
      </Flex>

      <Grid
        gapX={{
          initial: '0',
          md: '9',
        }}
        gapY={{
          initial: '2',
          md: '9',
        }}
        px={{ initial: '4', md: '8' }}
        pt={{ initial: '0', md: '5' }}
        columns={{ initial: '1', md: '2', lg: '3', xl: '5' }}
      >
        {movies?.results?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              onWatchListAdd={(status) => {
                onAddToWatchList(movie, status)
              }}
            />
          )
        })}
      </Grid>
    </div>
  )
}
