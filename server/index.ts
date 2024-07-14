import server from './server.ts'

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

server.on('error', (error) => {
  if (error instanceof Error) {
    console.error('Server error:', error.message)
  } else {
    console.error('Unknown server error occurred')
  }
})
