import { useQuery } from "react-query"
import { getTrendingGifs } from "../apis/giphyApi.ts"
import { useState } from "react"
import { Datum } from "../../models/Giphy.ts"
const Giphy = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const {
    data: gifs,
    error,
    isLoading,
  } = useQuery<Datum[], Error>('trendingGifs', getTrendingGifs, {
    staleTime: Infinity
  });
  const nextGif = () => {
    if (gifs && currentIndex < gifs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  if(isLoading) {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  }

  if(error instanceof Error) {
    return <p>Error: {error.message}</p>
  }

  const currentGif = gifs ? gifs[currentIndex] : null

  return (
    <>
      <div>
        <h1>Giphy</h1>
        {currentGif && (
          <div className="gifs">
            <h2>{currentGif.title}</h2>
            <img src={currentGif.images.original.url} alt={currentGif.title} />
            <button onClick={nextGif}>Next</button>
          </div>
        )}
      </div>
    </>
  )
}

export default Giphy