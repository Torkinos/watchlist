'use client'

import { FC } from 'react'
import Image from 'next/image'
import {
  Badge,
  Box,
  Card,
  ContextMenu,
  Heading,
  IconButton,
} from '@radix-ui/themes'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { ACCENT_COLOR } from '~/constants/theme'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'

interface DashboardViewProps {
  title?: string
  posterPath: string
  status?: WatchListStatus
  onWatchListAdd?: (status: WatchListStatus) => void
  hasBadge?: boolean
}

const STATUS_OPTIONS: WatchListStatus[] = [
  WatchListStatus.WATCHLIST,
  WatchListStatus.WATCHING,
  WatchListStatus.WATCHED,
]

export const MovieCard: FC<DashboardViewProps> = ({
  title,
  posterPath,
  onWatchListAdd,
  status,
}) => {
  const getLabelByStatus = (status: WatchListStatus) => {
    switch (status) {
      case WatchListStatus.WATCHLIST:
        return 'Want to watch'
      case WatchListStatus.WATCHING:
        return 'Watching'
      case WatchListStatus.WATCHED:
        return 'Done'
    }
  }

  const getColorByStatus = (status: WatchListStatus) => {
    switch (status) {
      case WatchListStatus.WATCHLIST:
        return 'blue'
      case WatchListStatus.WATCHING:
        return 'violet'
      case WatchListStatus.WATCHED:
        return 'green'
    }
  }

  return (
    <Card variant="ghost">
      <Box position="relative" width="100%" pt="150%">
        <Image
          sizes="100% 100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
          }}
          src={posterPath}
          alt={title || 'Movie poster'}
          priority
          fill
        />
      </Box>

      <Box position={'absolute'} top={'4'} left={'4'}>
        {status && (
          <Badge variant="solid" color={getColorByStatus(status)}>
            {getLabelByStatus(status)}
          </Badge>
        )}
      </Box>

      <Box position={'absolute'} top={'4'} right={'4'}>
        {
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <IconButton size="1" variant="solid" color={ACCENT_COLOR}>
                <PlusCircledIcon height="16" width="16" />
              </IconButton>
            </ContextMenu.Trigger>

            <ContextMenu.Content>
              {STATUS_OPTIONS.map((status) => {
                return (
                  <ContextMenu.Item
                    key={status}
                    onClick={() => onWatchListAdd?.(status)}
                  >
                    {getLabelByStatus(status)}
                  </ContextMenu.Item>
                )
              })}
            </ContextMenu.Content>
          </ContextMenu.Root>
        }
      </Box>

      <Box p="2">
        <Heading
          as="h2"
          style={{
            fontWeight: 500,
          }}
        >
          {title}
        </Heading>
      </Box>
    </Card>
  )
}
