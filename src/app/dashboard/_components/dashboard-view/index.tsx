'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Box, Card, Flex, Grid, Heading, IconButton } from '@radix-ui/themes'
import debounce from 'lodash.debounce'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useQueryParams } from '~/hooks/useQueryParams'
import { addToWatchList, fetchMovies } from '~/services/watchlistService'
import { ACCENT_COLOR } from '~/constants/theme'

import { GetMoviesTvResponse, TMDBMovie } from '~/services/tmdbService'
import { WatchListStatus } from '~/app/api/movies-tv/[id]/watchlist/enums/watchListStatus.enum'
import { WatchListType } from '~/app/api/movies-tv/[id]/watchlist/enums/watchListType.enum'
import { Header } from './header'
import { SearchField } from './searchField'
import { DashboardPageView } from '../../_enums/dashboard-page-view.enum'
import { QueryParams } from '../../interfaces/queryParams.interfce'

interface DashboardViewProps {
  movies: GetMoviesTvResponse
}

export const DashboardView: FC<DashboardViewProps> = ({ movies }) => {
  const params = useParams()

  const { updateQueryParams, queryParams } = useQueryParams<QueryParams>()

  const router = useRouter()

  const [moviesState, setMoviesState] = useState(movies)

  const view = (params.view as DashboardPageView) || DashboardPageView.DISCOVER

  const onSearch = async (searchPattern: string) => {
    updateQueryParams({ search: searchPattern })

    try {
      const searchResults = await fetchMovies({ searchPattern })
      console.log(searchResults)

      setMoviesState(searchResults)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = useCallback(
    debounce((value) => {
      onSearch(value)
    }, 500),
    []
  )

  const onAddToWatchList = async (movie: TMDBMovie) => {
    await addToWatchList(movie.id, {
      status: WatchListStatus.WATCHLIST,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      type: WatchListType.MOVIE,
      genreIds: movie.genre_ids.map(String),
      tmdbId: movie.id,
    })
  }

  useEffect(() => {
    if (queryParams?.search) {
      onSearch(queryParams.search)
    }
  }, [queryParams])

  return (
    <div>
      <Header
        activeTab={view}
        onTabSelect={(view) => router.push(`/dashboard/${view}`)}
      />

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
        {moviesState.results?.map((movie) => {
          return (
            <Card key={movie.id} variant="ghost">
              <Box position="relative" width="100%" pt="150%">
                <Image
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                />
              </Box>

              <Box position={'absolute'} top={'4'} right={'4'}>
                <IconButton
                  size="1"
                  variant="solid"
                  color={ACCENT_COLOR}
                  onClick={() => onAddToWatchList(movie)}
                >
                  <PlusCircledIcon height="16" width="16" />
                </IconButton>
              </Box>

              <Box pt="2">
                <Heading as="h2">{movie.title}</Heading>
              </Box>
            </Card>
          )
        })}
      </Grid>
    </div>
  )
}
