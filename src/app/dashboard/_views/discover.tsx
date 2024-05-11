'use client'

import { FC, useCallback } from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
import debounce from 'lodash.debounce'
import { useQueryParams } from '~/hooks/useQueryParams'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { addToWatchList } from '~/services/watchlistService/addToWatchList'
import { WatchlistItem } from '~/services/interfaces/watchlistItem.interface'
import { QueryParams } from '../interfaces/queryParams.interfce'
import { SearchField } from '../_components/searchField'
import { MovieCard } from '../_components/MovieCard'

interface DiscoverProps {
  watchlistItems: WatchlistItem[]
}

export const Discover: FC<DiscoverProps> = ({ watchlistItems }) => {
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
        {watchlistItems?.map((watchlistItem) => {
          return (
            <MovieCard
              key={watchlistItem.tmdbId}
              title={watchlistItem.title}
              posterPath={`https://image.tmdb.org/t/p/original/${watchlistItem.posterPath}`}
              onWatchListAdd={(status) => {
                onAddToWatchList(watchlistItem, status)
              }}
            />
          )
        })}
      </Grid>
    </div>
  )
}
