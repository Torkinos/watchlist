import { Box, Button, Flex, Tabs } from '@radix-ui/themes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { Database } from '~/__generated__/supabase'
import { Logo } from '~/components/logo'
import { DashboardPageView } from '../../_enums/dashboard-page-view.enum'
import { DASHBOARD_TABS } from '../../_constants/dashboard-tabs'

interface HeaderProps {
  activeTab: DashboardPageView
  onTabSelect: (tab: DashboardPageView) => void
}

export const Header: FC<HeaderProps> = ({ activeTab, onTabSelect }) => {
  const router = useRouter()

  const supabase = createClientComponentClient<Database>()

  const signOut = async () => {
    await supabase.auth.signOut()

    router.push('/log-in')
  }

  return (
    <header>
      <Box py="4" px="8">
        <Flex align="center" justify="between">
          <Logo size="small" />

          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List>
              {DASHBOARD_TABS.map((tab) => {
                return (
                  <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => {
                      onTabSelect(tab.value)
                    }}
                  >
                    {tab.label}
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>
          </Tabs.Root>

          <Button variant="soft" color="gray" onClick={signOut}>
            Logout
          </Button>
        </Flex>
      </Box>
    </header>
  )
}
