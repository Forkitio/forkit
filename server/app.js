const express = require('express');
const app = express();
const path = require('path');
const User = require('./db/User.js');
const passport = require('passport');
const jwt = require('jwt-simple');

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use(require('body-parser').json());

app.use(passport.initialize());

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if(!token) { return next() }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id;
    User.findById(id)
      .then( user => {
        if(!user) {
          return next({ status : 401 });
        }
        req.user = user;
        next()
      })
  }
  catch(ex) {
    next({ status : 401 })
  }
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pinterest', require('./routes/oauthPinterest'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status( err.status || 500).send({ error: err.message });
});

module.exports = app;
