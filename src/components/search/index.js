import React, { createRef, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch"
import SearchBox from "./SearchBox"
import SearchResult from "./SearchResult"
// custom hooks
import UseClickOutside from "./UseClickOutside"

const Search = ({ indices }) => {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setHasFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  UseClickOutside(rootRef, () => setHasFocus(false))

  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setHasFocus(true)} hasFocus={hasFocus} />
        <SearchResult
          show={query && query.length > 0 && hasFocus}
          indices={indices}
          className={hasFocus ? `` : `hidden`}
        />
      </InstantSearch>
    </div>
  )
}

export default Search
