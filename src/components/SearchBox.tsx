import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SearchField = styled.input`
  border: 0.1rem solid gray;
  height: 3.8rem;
  padding: 0 1rem;
  margin: 0;
  font-size: 1.8rem;
  border-radius: 0.2rem;
`

const Button = styled.button`
  height: 4rem;
  font-size: 1.8rem;
  border-radius: 0.2rem;
  margin-left: 0.5rem;
`

const SearchBox = ({ onSearch }: { onSearch: (a: string) => void }) => {
  const [query, setQuery] = useState('')
  return (
    <Wrapper>
      <SearchField
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch(query)
          }
        }}
      />
      <Button type="button" onClick={() => onSearch(query)}>
        search
      </Button>
    </Wrapper>
  )
}

export default React.memo(SearchBox)
