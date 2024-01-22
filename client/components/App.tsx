import Affirmations from './Affirmations.tsx'
import Weather from './Weather.tsx'
import Welcome from './Welcome.tsx'

function App() {
  return (
    <>
      <section>
        <div>
          <Welcome />
        </div>
        <div>
          <Weather />
        </div>
        <div>
          <Affirmations />
          
          <h1>other stuff</h1>
        </div>
      </section>
    </>
  )
}

export default App
