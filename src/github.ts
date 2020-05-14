import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

export interface IGithubSearchResult {
  total_count: number
  incomplete_results: boolean
  items: IGithubRepo[]
  next: string | null
  prev: string | null
}

export interface IGithubRepo {
  // Tons of fields skipped for brevity.
  id: number
  name: string
  full_name: string
  stargazers_count: number
  watchers_count: number
  html_url: string
}

// IGithubPagination holds Github pagination URLs.
interface IGithubPaginationLinks {
  next?: string
  prev?: string
  last?: string
}

export const useGithubSearchApi = () => {
  const [url, setUrl] = useState('')

  const [result, setResult] = useState<IGithubSearchResult>({
    total_count: 0,
    incomplete_results: false,
    items: [],
    next: null,
    prev: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      // URL can't be empty.
      if (url == null || url === '') {
        return
      }

      setIsError(false)
      setIsLoading(true)

      try {
        // Make the call!
        const result = await axios(url)

        console.log('result.data:', result.data)
        // console.log('result.headers:', result.headers)

        // Parse Github link headers, somewhat raw and hacky.
        let links: IGithubPaginationLinks = {}
        if (result.headers.link) {
          links = parseLinkHeader(result.headers.link)
        }

        setResult({
          ...result.data,
          next: links.next,
          prev: links.prev,
        })
      } catch (err) {
        console.error('Github search failed:', err)
        setIsError(true)
      }

      setIsLoading(false)
    }

    performSearch()
  }, [url])

  const search = useCallback(
    (query: string) => setUrl(`https://api.github.com/search/repositories?q=${encodeURI(query)}&sort=stars&order=desc`),
    [],
  )
  const goNext = useCallback(() => setUrl(result.next || ''), [result.next])
  const goPrev = useCallback(() => setUrl(result.prev || ''), [result.prev])

  return {
    result,
    isLoading,
    isError,
    // Memoize so that we can pass this function around as props
    // without forcing components to re-render.
    search: useCallback(search, []),
    next: result.next ? goNext : null,
    prev: result.prev ? goPrev : null,
  }
}

function parseLinkHeader(header: string): IGithubPaginationLinks {
  const page: any = {}
  const parts = header.split(/\s*[;,]\s*/g)
  for (let i = 0; i < parts.length; i += 2) {
    let k = parts[i + 1].substr(5).slice(0, -1)
    let v = parts[i].substr(1).slice(0, -1)
    page[k] = v
  }
  return page as IGithubPaginationLinks
}
