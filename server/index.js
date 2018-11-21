const PORT = process.env.PORT
const { syncAndSeed } = require('./db')
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = require('./app')

/*
require('./app').listen(PORT, () => console.log(`
  Listening on PORT ${PORT}!
  http://localhost:${PORT}/
`))
*/

http.createServer(app)
  .listen(80, () => console.log(`
    HTTP Connection : Listening on PORT 80!
    http://localhost:80/
  `))

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(443, () => console.log(`
    HTTPS Connection : Listening on PORT 443!
    https://localhost:443/
  `))

syncAndSeed()
  .then(() => console.log('Database is synced'));
