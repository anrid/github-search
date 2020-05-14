import React from 'react'
import styled from 'styled-components'
import { IGithubSearchResult } from '../github'

const Wrapper = styled.div`
  font-size: 1.4rem;
`

const Item = styled.div`
  flex: 1;
  min-height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.1rem solid #eeeeee;
`

const Cell = styled.div`
  flex: 1 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Number = styled(Cell)`
  flex: 0;
  padding: 0 1rem;
`

const Link = styled.a`
  color: blue;
  cursor: pointer;
`

const Header = styled.div`
  height: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
`

const Nav = styled.div`
  flex: 1;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
  align-self: flex-end;
`

interface IGithubSearchResultProps {
  result: IGithubSearchResult
  next: (() => void) | null
  prev: (() => void) | null
}

const GithubSearchResult = ({ result, next, prev }: IGithubSearchResultProps) => (
  <Wrapper>
    <Header>{result.total_count ? <>Total Count: {result.total_count}</> : <>Found Jack ..</>}</Header>

    <Nav>
      <div>{prev && <Link onClick={prev}>prev</Link>}</div>
      <div>{next && <Link onClick={next}>next</Link>}</div>
    </Nav>

    {result.items.map((x, i) => (
      <Item key={x.id}>
        <Number>{i + 1}.</Number>
        <Cell>
          <Link href={x.html_url} target="_blank">
            {x.full_name}
          </Link>
        </Cell>
        <Number>{x.watchers_count}</Number>
      </Item>
    ))}
  </Wrapper>
)

export default GithubSearchResult
