import { NextPage } from 'next'
import { fetchPopularMovies, searchMovies } from '~/services/tmdbService'
import { DashboardView } from '../_components/dashboard-view'
import { QueryParams } from '../interfaces/queryParams.interfce'

const Home: NextPage<{
  searchParams: QueryParams
}> = async ({ searchParams }) => {
  console.log(searchParams)

  const movies = searchParams.search?.length
    ? await searchMovies(searchParams.search)
    : await fetchPopularMovies()

  return (
    <main>
      <DashboardView movies={movies} />
    </main>
  )
}

export default Home
