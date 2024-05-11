import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '~/__generated__/supabase'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'
import { WatchListType } from '~/app/api/movies-tv/watchlist/enums/watchListType.enum'
import {
  FetchWatchListParams,
  FetchWatchListResponse,
} from './interfaces/fetchWatchlist.interface'

const getStatusByWatclistItemFields = (
  watchlistItem: Database['public']['Tables']['user_watchlist']['Row'],
  userId: string
): WatchListStatus => {
  const { watchlist_ids, watching_ids, watched_ids } = watchlistItem

  if (watchlist_ids?.includes(userId)) {
    return WatchListStatus.WATCHLIST
  }

  if (watching_ids?.includes(userId)) {
    return WatchListStatus.WATCHING
  }

  if (watched_ids?.includes(userId)) {
    return WatchListStatus.WATCHED
  }

  return WatchListStatus.WATCHLIST
}

export const fetchWatchList = async ({
  searchPattern,
}: FetchWatchListParams = {}): Promise<FetchWatchListResponse> => {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    throw new Error('Unauthorized')
  }

  let query = supabase.from('user_watchlist').select()

  if (searchPattern?.length) {
    query = query.ilike('title', `%${searchPattern}%`)
  }

  query = query.or(
    `watchlist_ids.cs.{${user.data.user.id}},watching_ids.cs.{${user.data.user.id}},watched_ids.cs.{${user.data.user.id}}`
  )

  const watchlistData = await query

  return {
    data:
      watchlistData.data?.map((watchlistItem) => {
        return {
          createdAt: watchlistItem.created_at,
          genreIds: watchlistItem.genre_ids || [],
          id: watchlistItem.id,
          posterPath: watchlistItem.poster_path || undefined,
          rating: watchlistItem.rating || undefined,
          releaseDate: watchlistItem.release_date || undefined,
          title: watchlistItem.title || undefined,
          tmdbId: watchlistItem.tmdb_id || undefined,
          type: watchlistItem.type as WatchListType,
          status: user.data.user?.id
            ? getStatusByWatclistItemFields(watchlistItem, user.data.user?.id)
            : WatchListStatus.WATCHLIST,
        }
      }) || [],
  }
}
