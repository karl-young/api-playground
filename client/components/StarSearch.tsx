import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { searchStarWars } from '../apis/star.ts';
import {
  Person,
  Film,
  Starship,
  Vehicle,
  Species,
  Planet,
} from '../../models/StarWars.ts';

const StarSearch = () => {
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState('');

  const {
    data: searchResults,
    error,
    isLoading,
    refetch, 
  } = useQuery(
    ['searchStarWars', selection],
    async () => {
      if (!query.trim()) {
        return [];
      }
      try {
        return await searchStarWars(query, selection);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message, "Didn't get Search");
          throw error;
        }
      }
    },
    {
      enabled: false, 
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelection(event.target.value);
  };

  const getResourceInfo = (
    result: Person | Film | Starship | Vehicle | Species | Planet
  ) => {
    let info = '';

    for (const [key, value] of Object.entries(result)) {
      info += `${key}: ${value}\n`;
    }

    return info;
  };

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
        <select value={selection} onChange={handleSelectionChange}>
          <option value="" disabled>
            Select a category
          </option>
          <option value="people">People</option>
          <option value="films">Films</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
          <option value="planets">Planets</option>
        </select>
        <input type="submit" value="Search" />
      </form>
      {isLoading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <ul>
          {searchResults &&
            searchResults.map(
              (result: Person | Film | Starship | Vehicle | Species | Planet) => (
                <li className="star-result" key={result.url}>
                  <pre>{getResourceInfo(result)}</pre>
                  <a href={`/details/${result.url}`}>View Details</a>
                </li>
              )
            )}
        </ul>
      )}
      {error instanceof Error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default StarSearch;
