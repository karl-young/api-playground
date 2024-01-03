import { useState, useEffect } from 'react'

import { getWelcome } from '../apis/apiClient.ts'

function Welcome() {
  const [welcomeStatement, setWelcomeStatement] = useState('')

  useEffect(() => {
    getWelcome()
      .then((res) => {
        setWelcomeStatement(res.statement)
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  return <h1>{welcomeStatement}</h1>
}

export default Welcome