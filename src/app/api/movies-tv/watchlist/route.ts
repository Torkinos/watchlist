import { NextResponse } from 'next/server'
import { fetchWatchList } from '~/services/supabaseService/fetchWatchList'

export const GET = async () => {
  try {
    const watchlistData = await fetchWatchList()

    return new NextResponse(JSON.stringify(watchlistData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)

    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
