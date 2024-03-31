'use client'

import { Button } from '@radix-ui/themes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const DashboardView: FC = () => {
  const router = useRouter()

  const supabase = createClientComponentClient<any>()

  const signOut = async () => {
    await supabase.auth.signOut()

    router.push('/log-in')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  )
}
