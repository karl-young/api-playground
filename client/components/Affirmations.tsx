import { useState, useEffect } from 'react'
import { Affirmation } from '../../models/Affrmations.ts'
import { getAffirmations } from '../apis/apiClient.ts'

const Affirmations = () => {
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null)

  async function getAffirm() {
    const affirmation = await getAffirmations()
    setAffirmation(affirmation)
  }
  useEffect(() => {
    try {
      getAffirm()
    } catch (error) {
      console.error(error, "Didn't get Affirmation")
    }
  }, [])

  return (
    <>
      <div>
        <h1>Affirmation</h1>
        <h3>{affirmation?.affirmation}</h3>
      </div>
    </>
  )
}

export default Affirmations
