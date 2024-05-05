import { NextRequest, NextResponse } from 'next/server'
import { fetchPopularMovies, searchMovies } from '~/services/tmdbService'

export const GET = async (request: NextRequest) => {
  try {
    const searchPattern = request.nextUrl.searchParams.get('searchPattern')

    if (searchPattern?.length) {
      const searchResults = await searchMovies(searchPattern)

      return new NextResponse(JSON.stringify(searchResults), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const popularMovies = await fetchPopularMovies()

    return new NextResponse(JSON.stringify(popularMovies), {
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
