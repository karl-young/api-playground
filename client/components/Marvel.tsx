import { useState } from 'react'
import { useQuery } from 'react-query'
import { getComics } from '../apis/marvelApi.ts'
import { Result } from '../../models/Comic.ts'

const Comic = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Inside the Comic component

  const {
    data: comics,
    error,
    isLoading,
  } = useQuery<Result[], Error>('comics', getComics, {
    staleTime: Infinity, // Set your desired stale time
  })

  const nextComic = () => {
    if (comics && currentIndex < comics.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>
  }

  const currentComic = comics ? comics[currentIndex] : null
  console.log('currentIndex:', currentIndex)
  console.log('comics:', comics)
  console.log('currentComic:', currentComic)
  return (
    <>
      <div>
        <h1>Marvel Comic</h1>
        {currentComic && (
          <div className="comics">
            <h2>{currentComic.title}</h2>
            {/* Displaying textObjects */}
            {currentComic.textObjects &&
              currentComic.textObjects.map((textObject, index) => (
                <p key={index}>{textObject.text}</p>
              ))}
            <img
            className='comic-img'
              src={`${currentComic.thumbnail.path}.${currentComic.thumbnail.extension}`}
              alt={currentComic.title}
            />
          </div>
        )}

        <button
          onClick={nextComic}
          disabled={currentIndex === (comics?.length ?? 0) - 1}
        >
          Next Comic
        </button>
      </div>
    </>
  )
}

export default Comic
