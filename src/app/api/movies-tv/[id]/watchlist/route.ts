import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '~/__generated__/supabase'
import { AddToWatchListBodyParams } from './interfaces/watclist.interface'

interface Params {
  id: string
}

interface RequestParams {
  params: Params
}

export const POST = async (request: NextRequest, { params }: RequestParams) => {
  const id = params.id

  const res = (await request.json()) as AddToWatchListBodyParams

  console.log('res', res, id)

  try {
    const supabase = createServerActionClient<Database>({
      cookies: () => cookies(),
    })

    const user = await supabase.auth.getUser()

    // update user's watchlist table with user id

    return new NextResponse(JSON.stringify(user), {
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
