/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Affirmations from './Affirmations.tsx'
import Weather from './Weather.tsx'
import Welcome from './Welcome.tsx'
import Canvas from './Canvas.tsx'
import AudioPlayer from './Player.jsx'
import Comic from './Marvel.tsx'
import GiphySearch from './Giphy.tsx'
import StarSearch from './StarSearch.tsx'
import Snow from './Snow.tsx'

const queryClient = new QueryClient()
function App() {
  const [isChecked, setIsChecked] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)

  function handleChange() {
    setIsChecked(!isChecked)
  }
  const toggleCanvas = () => {
    setShowCanvas(!showCanvas)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {showCanvas ? <Canvas /> : <Snow />}
        <div className="button-container">
          <button
            className={`button ${showCanvas ? '' : 'spin-animation'}`}
            onClick={toggleCanvas}
          >
            <div className="snowflake-container">
              <div className="brackets">{'<\u00A0'}</div>
              <div className="snowflake" />
              <div className="brackets">{`\u00A0>`}</div>
            </div>
          </button>
        </div>
        <div className="welcome">
          <Welcome />
        </div>
        <div className="wrapper">
          <div className="container">
            <input
              type="radio"
              id="c1"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c1" className="card">
              <div className="row">
                <div className="icon">1</div>
                <div className="description">
                  <Weather />
                </div>
              </div>
            </label>
            <input
              type="radio"
              id="c2"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c2" className="card">
              <div className="row">
                <div className="icon">2</div>
                <div className="description">
                  <Affirmations />
                </div>
              </div>
            </label>
            <input
              type="radio"
              id="c3"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c3" className="card">
              <div className="row">
                <div className="icon">3</div>
                <div className="description">
                  <AudioPlayer />
                </div>
              </div>
            </label>
            <input
              type="radio"
              id="c4"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c4" className="card">
              <div className="row">
                <div className="icon">4</div>
                <div className="description">
                  <Comic />
                </div>
              </div>
            </label>
            <input
              type="radio"
              id="c5"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c5" className="card">
              <div className="row">
                <div className="icon">5</div>
                <div className="description">
                  <GiphySearch />
                </div>
              </div>
            </label>
            <input
              type="radio"
              id="c6"
              name="slide"
              checked={isChecked}
              onChange={() => handleChange()}
            />
            <label htmlFor="c6" className="card">
              <div className="row">
                <div className="icon">6</div>
                <div className="description">
                  <StarSearch />
                </div>
              </div>
            </label>
          </div>
        </div>
        <Canvas />
      </>
    </QueryClientProvider>
  )
}

export default App
