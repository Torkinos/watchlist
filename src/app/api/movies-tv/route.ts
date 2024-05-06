import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '~/__generated__/supabase'
import { fetchPopularMovies, searchMovies } from '~/services/tmdbService'

export const GET = async (request: NextRequest) => {
  try {
    const searchPattern = request.nextUrl.searchParams.get('searchPattern')

    const supabase = createServerActionClient<Database>({
      cookies: () => cookies(),
    })

    const user = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

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
