import { NextPage } from 'next'
import { fetchPopularMovies, searchMovies } from '~/services/tmdbService'
import { fetchWatchList } from '~/services/supabaseService/fetchWatchList'
import { QueryParams } from '../interfaces/queryParams.interfce'
import { Discover } from '../_views/discover'
import { Header } from '../_components/header'
import { DashboardPageView } from '../_enums/dashboardPageView.enum'
import { Watchlist } from '../_views/watchlist'

const Home: NextPage<{
  searchParams: QueryParams
  params: { view: DashboardPageView }
}> = async ({ searchParams, params }) => {
  const [movies, watchlist] = await Promise.all([
    searchParams.search?.length
      ? searchMovies(searchParams.search)
      : fetchPopularMovies(),
    fetchWatchList({
      searchPattern: searchParams.search,
    }),
  ])

  return (
    <main>
      <Header activeTab={params.view} />

      {params.view === DashboardPageView.DISCOVER && (
        <Discover movies={movies} />
      )}

      {params.view === DashboardPageView.WATCHLIST && (
        <Watchlist watchlist={watchlist} />
      )}
    </main>
  )
}

export default Home
