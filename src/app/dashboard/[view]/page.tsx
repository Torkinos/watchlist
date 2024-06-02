import { NextPage } from 'next'
import { searchMovies } from '~/services/tmdbService/searchMovies'
import { fetchPopularMovies } from '~/services/tmdbService/fetchPopularMovies'
import { fetchWatchList } from '~/services/supabaseService/fetchWatchList'
import { fetchPopularTvShows } from '~/services/tmdbService/fetchPopularTvShows'
import { searchTvShows } from '~/services/tmdbService/searchTvShows'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { QueryParams } from '../interfaces/queryParams.interfce'
import { Discover } from '../_views/discover'
import { Header } from '../_components/header'
import { DashboardPageView } from '../_enums/dashboardPageView.enum'
import { Watchlist } from '../_views/watchlist'

const Home: NextPage<{
  searchParams: QueryParams
  params: { view: DashboardPageView }
}> = async ({ searchParams, params }) => {
  const [movies, tvShows, watchlist] = await Promise.all([
    searchParams.search?.length
      ? searchMovies(searchParams.search)
      : fetchPopularMovies(),
    searchParams.search?.length
      ? searchTvShows(searchParams.search)
      : fetchPopularTvShows(),
    fetchWatchList({
      searchPattern: searchParams.search,
    }),
  ])

  const statusesByTmdbId = watchlist.data.reduce<
    Record<string, WatchListStatus>
  >((acc, item) => {
    if (item.tmdbId && item.status) {
      acc[item.tmdbId] = item.status
    }

    return acc
  }, {})

  const watchlistItems = [...movies, ...tvShows].map((item) => ({
    ...item,
    status: item.tmdbId ? statusesByTmdbId[item.tmdbId] : undefined,
  }))

  return (
    <main>
      <Header activeTab={params.view} />

      {params.view === DashboardPageView.DISCOVER && (
        <Discover watchlistItems={watchlistItems} />
      )}

      {params.view === DashboardPageView.WATCHLIST && (
        <Watchlist watchlist={watchlist} />
      )}
    </main>
  )
}

export default Home
