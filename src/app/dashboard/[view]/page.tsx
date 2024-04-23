import { NextPage } from 'next'
import { fetchPopularMovies } from '~/services/tmdbService'
import { DashboardView } from '../_components/dashboard-view'

const Home: NextPage = async () => {
  const movies = await fetchPopularMovies()

  return (
    <main>
      <DashboardView movies={movies} />
    </main>
  )
}

export default Home
