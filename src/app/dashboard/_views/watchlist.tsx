'use client'

import { FC, useCallback } from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
import debounce from 'lodash.debounce'
import { useQueryParams } from '~/hooks/useQueryParams'
import { FetchWatchListResponse } from '~/services/supabaseService/interfaces/fetchWatchlist.interface'
import { WatchlistItem } from '~/services/interfaces/watchlistItem.interface'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { addToWatchList } from '~/services/watchlistService/addToWatchList'
import revalidateWatchlist from '~/actions/revalidate'
import { QueryParams } from '../interfaces/queryParams.interfce'
import { SearchField } from '../_components/searchField'
import { MovieCard } from '../_components/MovieCard'

interface WatchlistProps {
  watchlist: FetchWatchListResponse
}

export const Watchlist: FC<WatchlistProps> = ({ watchlist }) => {
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
    watchlistItem: WatchlistItem,
    status: WatchListStatus
  ) => {
    if (!watchlistItem.tmdbId) {
      return
    }

    await addToWatchList({
      ...watchlistItem,
      status: status,
    })

    await revalidateWatchlist()
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
        mt={{ initial: '5', md: '0' }}
        gapX={{
          initial: '2',
          md: '9',
        }}
        gapY={{
          initial: '2',
          md: '9',
        }}
        px={{ initial: '4', md: '8' }}
        pt={{ initial: '2', md: '5' }}
        columns={{ initial: '2', lg: '3', xl: '5' }}
      >
        {watchlist.data?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
              status={movie.status}
              onWatchListAdd={(status) => onAddToWatchList(movie, status)}
            />
          )
        })}
      </Grid>
    </div>
  )
}
