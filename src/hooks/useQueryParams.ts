import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface UseQueryParamsValue<T> {
  pathname: string
  searchParams: URLSearchParams
  queryParams?: T
  updateQueryParams: (params: T) => void
}

export const useQueryParams = <T>(): UseQueryParamsValue<T> => {
  const pathname = usePathname()

  const searchParams = useSearchParams()

  const router = useRouter()

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  ) as T

  const updateQueryParams = (params: T) => {
    const combinedParams = { ...queryParams, ...params }

    const searchParams = new URLSearchParams(
      combinedParams as Record<string, string>
    )

    const search = searchParams.toString()

    router.replace(`${pathname}?${search}`)
  }

  return { pathname, searchParams, updateQueryParams, queryParams }
}
