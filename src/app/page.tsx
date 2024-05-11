import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { Database } from '~/__generated__/supabase'

const Home: NextPage = async () => {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    permanentRedirect('/dashboard')
  }

  permanentRedirect('/log-in')
}

export default Home
