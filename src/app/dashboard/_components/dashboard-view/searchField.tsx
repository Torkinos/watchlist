import { IconButton, TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface SearchFieldProps {
  placeholder?: string
  onChange?: (value: string) => void
  value?: string
}

export const SearchField: FC<SearchFieldProps> = ({
  placeholder = 'Search for Anime, Movie, Tv Show',
  onChange,
  value = '',
}) => {
  const [searchPattern, setSearchPattern] = useState(value)

  const handleChange = (value: string) => {
    setSearchPattern(value)

    onChange?.(value)
  }

  useEffect(() => {
    if (value !== searchPattern) {
      setSearchPattern(value)
    }
  }, [value])

  return (
    <TextField.Root
      placeholder={placeholder}
      size="3"
      onChange={(e) => handleChange(e.target.value)}
      value={searchPattern}
    >
      <TextField.Slot></TextField.Slot>

      <TextField.Slot px={'1'}>
        <IconButton size="2" variant="soft" color="gray">
          <MagnifyingGlassIcon height="16" width="16" />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  )
}
