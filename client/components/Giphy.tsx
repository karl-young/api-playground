import { useState } from 'react'
import { useQuery } from 'react-query'
import { searchGifs } from '../apis/giphyApi.ts'

const GiphySearch = () => {
  const [query, setQuery] = useState('')

  const {
    data: searchResults,
    error,
    isLoading,
  } = useQuery(['searchGifs', query], async () => {
    const apiKey = 'JLPu1k00txtFjXCrqZzSBuGW7mtfiJnk'

    if (!apiKey) {
      throw new Error('Giphy API key is missing.')
    }

    return await searchGifs(apiKey, query)
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const queryValue = formData.get('search-gifs') as string
    setQuery(queryValue.trim())
  }

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
  if (error instanceof Error) 
    return (
    <div>Error: {error.message}</div>
  )

  return (
    <>
      <div>
        <div>
          <img
            className="powered"
            src="./client/Styles/images/Poweredby_100px_Badge.gif"
            alt="Powered by Giphy"
          />
        </div>
        <h1 className="title">Giphy Search</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              name="search-gifs"
              type="text"
              defaultValue={query}
              placeholder="Enter search query..."
            />
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
        <ul>
          {searchResults?.map((gif) => (
            <li key={gif.id}>
              <img
                className="content"
                src={gif.images.fixed_height.url}
                alt={gif.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default GiphySearch
