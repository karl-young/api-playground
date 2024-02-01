/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import Affirmations from './Affirmations.tsx'
import Weather from './Weather.tsx'
import Welcome from './Welcome.tsx'
import Canvas2 from './Canvas.tsx'
import AudioPlayer from './Player.jsx'

function App() {
  const [isChecked, setIsChecked] = useState(true)

  function handleChange() {
    setIsChecked(!isChecked)
  }
  return (
    <>
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
                <h1>other stuff</h1>
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
                <h1>other stuff</h1>
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
                <h1>other stuff</h1>
              </div>
            </div>
          </label>
        </div>
      </div>
      <Canvas2 />
      <div></div>
    </>
  )
}

export default App
