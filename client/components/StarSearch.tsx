import { useState } from 'react'
import { useQuery } from 'react-query'
import { searchStarWars } from '../apis/star.ts'
import {
  Person,
  Film,
  Starship,
  Vehicle,
  Species,
  Planet,
} from '../../models/StarWars.ts'

const StarSearch = () => {
  const [query, setQuery] = useState('')
  const [selection, setSelection] = useState('people')

  const {
    data: searchResults,
    error,
    isLoading,
  } = useQuery(['searchStarWars', selection], async () => {
    if (!query.trim()) {
      return []
    }
    try {
      return await searchStarWars(query, selection)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message, "Didn't get Search")
      }
    }
  })

  if (isLoading) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const getResourceInfo = (
    result: Person | Film | Starship | Vehicle | Species | Planet
  ) => {
    let info = ''

    for (const [key, value] of Object.entries(result)) {
      info += `${key}: ${value}\n`
    }

    return info
  }

  return (
    <div>
      <h1>Star Wars Search</h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
        />
        <select
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="people">People</option>
          <option value="films">Films</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
          <option value="planets">Planets</option>
        </select>
        <input type="submit" value="Search" />
      </form>
      <ul>
        {searchResults &&
          searchResults.map(
            (result: Person | Film | Starship | Vehicle | Species | Planet) => (
              <li className="star-result" key={result.url}>
                <pre>{getResourceInfo(result)}</pre>
              </li>
            )
          )}
      </ul>
    </div>
  )
}

export default StarSearch
