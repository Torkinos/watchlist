import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Database } from '~/__generated__/supabase'

export const GET = async () => {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  })

  await supabase.auth.signOut()

  return NextResponse.redirect('/log-in')
}
