import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '~/__generated__/supabase'
import { AddToWatchListBodyParams } from '../interfaces/watclist.interface'
import { WatchListStatus } from '../enums/watchListStatus.enum'

interface Params {
  id: string
}

interface RequestParams {
  params: Params
}

export const POST = async (request: NextRequest, { params }: RequestParams) => {
  const id = params.id

  const res = (await request.json()) as AddToWatchListBodyParams

  try {
    const supabase = createServerActionClient<Database>({
      cookies: () => cookies(),
    })

    const user = await supabase.auth.getUser()

    if (!user.data.user) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const watchlistItem = await supabase
      .from('user_watchlist')
      .select()
      .eq('tmdb_id', id)

    if (watchlistItem.data?.length) {
      const watchlistItemData = watchlistItem.data[0]

      const watchlistIds = watchlistItemData.watchlist_ids || []
      const watchingIds = watchlistItemData.watching_ids || []
      const watchedIds = watchlistItemData.watched_ids || []

      const newWatchlistIds = watchlistIds.filter(
        (id) => id !== user.data.user?.id
      )
      const newWatchingIds = watchingIds.filter(
        (id) => id !== user.data.user?.id
      )
      const newWatchedIds = watchedIds.filter((id) => id !== user.data.user?.id)

      if (res.status === WatchListStatus.WATCHLIST) {
        newWatchlistIds.push(user.data.user.id)
      }

      if (res.status === WatchListStatus.WATCHING) {
        newWatchingIds.push(user.data.user.id)
      }

      if (res.status === WatchListStatus.WATCHED) {
        newWatchedIds.push(user.data.user.id)
      }

      const supabaseResponse = await supabase
        .from('user_watchlist')
        .update({
          watchlist_ids: newWatchlistIds,
          watching_ids: newWatchingIds,
          watched_ids: newWatchedIds,
        })
        .eq('tmdb_id', id)

      if (supabaseResponse.error) {
        console.error(supabaseResponse.error)

        return new NextResponse(JSON.stringify(supabaseResponse.error), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      return new NextResponse(JSON.stringify(supabaseResponse.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const supabaseResponse = await supabase.from('user_watchlist').insert({
      tmdb_id: id,
      title: res.title,
      release_date: res.releaseDate,
      poster_path: res.posterPath,
      rating: res.rating,
      type: res.type,
      genre_ids: res.genreIds,
      watchlist_ids: [
        ...(res.status === WatchListStatus.WATCHLIST
          ? [user.data.user.id]
          : []),
      ],
      watching_ids: [
        ...(res.status === WatchListStatus.WATCHING ? [user.data.user.id] : []),
      ],
      watched_ids: [
        ...(res.status === WatchListStatus.WATCHED ? [user.data.user.id] : []),
      ],
    })

    if (supabaseResponse.error) {
      console.error(supabaseResponse.error)

      return new NextResponse(JSON.stringify(supabaseResponse.error), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new NextResponse(JSON.stringify(supabaseResponse.data), {
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
