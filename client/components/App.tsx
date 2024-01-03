import Affirmations from './Affirmations.tsx'
import Weather from './Weather.tsx'
import Welcome from './Welcome.tsx'

function App() {
  return (
    <>
      <section>
        <div>
          <Welcome />
          <Weather />
        </div>
        <div>
          <Affirmations />
        </div>
      </section>
    </>
  )
}

export default App
