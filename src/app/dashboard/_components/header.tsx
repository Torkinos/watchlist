import { Box, Button, Flex, Tabs } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Logo } from '~/components/logo'
import { DASHBOARD_TABS } from '../_constants/dashboard-tabs'
import { DashboardPageView } from '../_enums/dashboardPageView.enum'

interface HeaderProps {
  activeTab: DashboardPageView
}

export const Header: FC<HeaderProps> = ({ activeTab }) => {
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

            <Link href={'/log-out'}>
              <Button variant="soft" color="gray">
                Logout
              </Button>
            </Link>
          </Flex>
        )}

        <Flex align="center" justify={{ initial: 'center', md: 'between' }}>
          {showOnDesktop(<Logo size="small" />)}

          <Tabs.Root defaultValue={activeTab}>
            <Tabs.List>
              {DASHBOARD_TABS.map((tab) => {
                return (
                  <Link key={tab.value} href={`/dashboard/${tab.value}`}>
                    <Tabs.Trigger value={tab.value}>{tab.label}</Tabs.Trigger>
                  </Link>
                )
              })}
            </Tabs.List>
          </Tabs.Root>

          {showOnDesktop(
            <Link href={'/log-out'}>
              <Button variant="soft" color="gray">
                Logout
              </Button>
            </Link>
          )}
        </Flex>
      </Box>
    </header>
  )
}
