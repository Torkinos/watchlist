import { NextRequest, NextResponse } from 'next/server'
import { fetchPopularMovies } from '~/services/tmdbService'

export const GET = async (req: NextRequest) => {
  try {
    const popularMovies = await fetchPopularMovies()
    console.log(popularMovies)

    return new NextResponse(JSON.stringify(popularMovies.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)

    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
