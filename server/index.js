const httpPORT = process.env.PORT || 3000
const httpsPORT = process.env.PORT || 443
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
  .listen(httpPORT, () => console.log(`
    HTTP Connection : Listening on PORT ${httpPORT}!
    http://localhost:${httpPORT}/
  `))

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(httpsPORT, () => console.log(`
    HTTPS Connection : Listening on PORT ${httpsPORT}!
    https://localhost:${httpsPORT}/
  `))

syncAndSeed()
  .then(() => console.log('Database is synced'));
