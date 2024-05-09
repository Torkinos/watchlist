import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { Database } from '~/__generated__/supabase'

const LogOut: NextPage = async () => {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  await supabase.auth.signOut()

  permanentRedirect(`/log-in`)
}

export default LogOut
