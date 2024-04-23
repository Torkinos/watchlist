import { Box, Button, Flex, Tabs } from '@radix-ui/themes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
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

  const showOnTablet = (element: ReactNode) => {
    return <Box display={{ initial: 'block', md: 'none' }}>{element}</Box>
  }

  const showOnDesktop = (element: ReactNode) => {
    return <Box display={{ initial: 'none', md: 'block' }}>{element}</Box>
  }

  return (
    <header>
      <Box py="4" px={{ initial: '4', md: '8' }}>
        {showOnTablet(
          <Flex align="center" justify="between">
            <Logo size="small" />

            <Button variant="soft" color="gray" onClick={signOut}>
              Logout
            </Button>
          </Flex>
        )}

        <Flex align="center" justify={{ initial: 'center', md: 'between' }}>
          {showOnDesktop(<Logo size="small" />)}

          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List>
              {DASHBOARD_TABS.map((tab) => {
                return (
                  <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => onTabSelect(tab.value)}
                  >
                    {tab.label}
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>
          </Tabs.Root>

          {showOnDesktop(
            <Button variant="soft" color="gray" onClick={signOut}>
              Logout
            </Button>
          )}
        </Flex>
      </Box>
    </header>
  )
}
