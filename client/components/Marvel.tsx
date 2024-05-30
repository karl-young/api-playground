import { useState } from 'react'
import { useQuery } from 'react-query'
import { getComics } from '../apis/marvelApi.ts'
import { Result } from '../../models/Comic.ts'

const Comic = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const currentComic = comics ? comics[currentIndex] : null

  return (
    <>
      <div className="comics">
        {currentComic && (
          <div>
            <h2 className="text">{currentComic.title}</h2>
            {currentComic.textObjects &&
              currentComic.textObjects.map((textObject, index) => (
                <p className="text" key={index}>
                  {textObject.text} {''}
                </p>
              ))}
            <div>
              <button
                className="button"
                onClick={nextComic}
                disabled={currentIndex === (comics?.length ?? 0) - 1}
              >
                Next Comic
              </button>
            </div>
            <img
              className="comic-img"
              src={`${currentComic.thumbnail.path}.${currentComic.thumbnail.extension}`}
              alt={currentComic.title}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Comic
