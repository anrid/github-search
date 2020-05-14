import React from 'react'
import styled from 'styled-components'
import Spinner from './components/SpinningOctocat'
import SearchBox from './components/SearchBox'
import SearchResult from './components/GithubSearchResult'
import { useGithubSearchApi } from './github'

const Wrapper = styled.div`
  width: 60rem;
  display: flex;
  justify-content: flex-start;
`

const Inner = styled.div`
  margin: 2rem 20rem;
`

const Error = styled.div`
  color: red;
`

const SearchResultBox = styled.div``

const App = () => {
  const { result, isLoading, isError, search, next, prev } = useGithubSearchApi()

  return (
    <Wrapper>
      <Inner>
        <SearchBox onSearch={search} />
        <SearchResultBox>
          {isError && <Error>Github search failed!</Error>}

          {isLoading && <Spinner />}

          {!isLoading && <SearchResult result={result} next={next} prev={prev} />}
        </SearchResultBox>
      </Inner>
    </Wrapper>
  )
}

export default App
