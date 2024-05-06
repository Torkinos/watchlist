import { NextPage } from 'next'
import { fetchPopularMovies, searchMovies } from '~/services/tmdbService'
import { fetchWatchList } from '~/services/supabaseService/fetchWatchList'
import { DashboardView } from '../_components/dashboard-view'
import { QueryParams } from '../interfaces/queryParams.interfce'

const Home: NextPage<{
  searchParams: QueryParams
}> = async ({ searchParams }) => {
  const [movies, watchlist] = await Promise.all([
    searchParams.search?.length
      ? searchMovies(searchParams.search)
      : fetchPopularMovies(),
    fetchWatchList(),
  ])

  return (
    <main>
      <DashboardView movies={movies} watchlist={watchlist.data || []} />
    </main>
  )
}

export default Home
