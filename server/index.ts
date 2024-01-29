import server from './server.ts'

const port = process.env.PORT || 3002

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
