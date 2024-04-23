'use client'

import { FC } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Box, Card, Grid } from '@radix-ui/themes'
import { Header } from './header'
import { DashboardPageView } from '../../_enums/dashboard-page-view.enum'

interface DashboardViewProps {
  movies: any
}

export const DashboardView: FC<DashboardViewProps> = ({ movies }) => {
  const params = useParams()

  const router = useRouter()

  const view = (params.view as DashboardPageView) || DashboardPageView.DISCOVER

  return (
    <div>
      <Header
        activeTab={view}
        onTabSelect={(view) => router.push(`/dashboard/${view}`)}
      />

      <Grid gap="6" columns={{ initial: '1', md: '2', lg: '3', xl: '5' }}>
        {movies.results?.map((movie: any) => {
          return (
            <Card key={movie.id}>
              <Box position="relative" width="100%" pt="150%">
                <Image
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

              <h2>{movie.title}</h2>

              <p>{movie.overview}</p>
            </Card>
          )
        })}
      </Grid>
    </div>
  )
}
