'use server'

import { revalidateTag } from 'next/cache'

export default async function revalidateWatchlist() {
  revalidateTag('dashboard/watchlist')
}
