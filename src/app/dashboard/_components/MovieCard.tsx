'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Box, Card, ContextMenu, Heading, IconButton } from '@radix-ui/themes'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { ACCENT_COLOR } from '~/constants/theme'
import { WatchListStatus } from '~/app/api/movies-tv/watchlist/enums/watchListStatus.enum'

interface DashboardViewProps {
  title?: string
  posterPath: string
  onWatchListAdd?: (status: WatchListStatus) => void
}

export const MovieCard: FC<DashboardViewProps> = ({
  title,
  posterPath,
  onWatchListAdd,
}) => {
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

      {!!onWatchListAdd && (
        <Box position={'absolute'} top={'4'} right={'4'}>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <IconButton size="1" variant="solid" color={ACCENT_COLOR}>
                <PlusCircledIcon height="16" width="16" />
              </IconButton>
            </ContextMenu.Trigger>

            <ContextMenu.Content>
              <ContextMenu.Item
                onClick={() => onWatchListAdd?.(WatchListStatus.WATCHLIST)}
              >
                Want to watch
              </ContextMenu.Item>
              <ContextMenu.Item
                onClick={() => onWatchListAdd?.(WatchListStatus.WATCHING)}
              >
                Watching
              </ContextMenu.Item>
              <ContextMenu.Item
                onClick={() => onWatchListAdd?.(WatchListStatus.WATCHED)}
              >
                Done
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </Box>
      )}

      <Box pt="2">
        <Heading as="h2">{title}</Heading>
      </Box>
    </Card>
  )
}
