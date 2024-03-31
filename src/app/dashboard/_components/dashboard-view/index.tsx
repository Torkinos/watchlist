'use client'

import { FC } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from './header'
import { DashboardPageView } from '../../_enums/dashboard-page-view.enum'

export const DashboardView: FC = () => {
  const params = useParams()

  const router = useRouter()

  const view = (params.view as DashboardPageView) || DashboardPageView.DISCOVER

  return (
    <div>
      <Header
        activeTab={view}
        onTabSelect={(view) => router.push(`/dashboard/${view}`)}
      />
    </div>
  )
}
