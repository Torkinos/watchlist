import { Box, Heading, Text } from '@radix-ui/themes'
import React, { FC } from 'react'

interface LogoProps {
  size: 'small' | 'medium' | 'large'
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Logo: FC<LogoProps> = ({ headingAs = 'h2', size = 'medium' }) => {
  const getHeadingSize = (size: LogoProps['size']) => {
    switch (size) {
      case 'small':
        return '5'
      case 'medium':
        return '7'
      case 'large':
        return '9'
    }
  }

  const getTextSize = (size: LogoProps['size']) => {
    switch (size) {
      case 'small':
        return '1'
      case 'medium':
        return '2'
      case 'large':
        return '3'
    }
  }

  return (
    <Box>
      <Heading
        as={headingAs}
        size={getHeadingSize(size)}
        align="center"
        highContrast
        weight="bold"
      >
        Watchlist
      </Heading>

      <Text as="p" size={getTextSize(size)} align="center" color="gray">
        Anime | Movie | TV Show
      </Text>
    </Box>
  )
}
