import React from 'react'
import styled from 'styled-components'
import { IGithubSearchResult } from '../github'

const Wrapper = styled.div`
  width: 60rem;
  font-size: 1.4rem;
`

const Item = styled.div`
  height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.1rem solid #eeeeee;
`

const Header = styled(Item)`
  margin-top: 1rem;
  font-weight: 600;
  border-bottom: 0.1rem solid black;
`

const Name = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Id = styled.div`
  flex: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
  width: 10rem;
`

const Number = styled.div`
  flex: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
`

const Link = styled.a`
  color: blue;
  cursor: pointer;
`

const Info = styled.div`
  height: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 0.1rem solid gray;
`

const Nav = styled.div`
  flex: 1;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
`

interface IGithubSearchResultProps {
  result: IGithubSearchResult
  next: (() => void) | null
  prev: (() => void) | null
}

const GithubSearchResult = ({ result, next, prev }: IGithubSearchResultProps) => (
  <Wrapper>
    <Info>{result.total_count ? <>Total Count: {result.total_count}</> : <>Found Jack ..</>}</Info>

    {result.total_count > 0 && (
      <Nav>
        <div>{prev && <Link onClick={prev}>prev</Link>}</div>
        <div>{next && <Link onClick={next}>next</Link>}</div>
      </Nav>
    )}

    <Header>
      <Id>Id</Id>
      <Name>Name</Name>
      <Number>Watchers</Number>
    </Header>

    {result.items.map((x, i) => (
      <Item key={x.id}>
        <Id>{x.id}</Id>
        <Name>
          <Link href={x.html_url} target="_blank">
            {x.full_name}
          </Link>
        </Name>
        <Number>{x.watchers_count}</Number>
      </Item>
    ))}
  </Wrapper>
)

export default GithubSearchResult
