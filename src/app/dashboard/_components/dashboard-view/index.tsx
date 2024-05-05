'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Box, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import debounce from 'lodash.debounce'
import { useQueryParams } from '~/hooks/useQueryParams'
import { fetchMovies } from '~/services/watchlistService'
import { Header } from './header'
import { SearchField } from './searchField'
import { DashboardPageView } from '../../_enums/dashboard-page-view.enum'

interface DashboardViewProps {
  movies: any
}

export const DashboardView: FC<DashboardViewProps> = ({ movies }) => {
  const params = useParams()

  const { updateQueryParams, queryParams } = useQueryParams<{
    search?: string
  }>()

  const router = useRouter()

  const [moviesState, setMoviesState] = useState(movies)

  const view = (params.view as DashboardPageView) || DashboardPageView.DISCOVER

  const onSearch = async (searchPattern: string) => {
    updateQueryParams({ search: searchPattern })

    try {
      const searchResults = await fetchMovies({ searchPattern })

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
        {moviesState.results?.map((movie: any) => {
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
