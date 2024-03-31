import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { DashboardView } from '../_components/dashboard-view'

const Home: NextPage = async () => {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<any>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    permanentRedirect('/log-in')
  }

  return (
    <main>
      <DashboardView />
    </main>
  )
}

export default Home
