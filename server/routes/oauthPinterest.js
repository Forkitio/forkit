const router = require('express').Router()
const passport = require('passport')
const User = require('../db/User')
const jwt = require('jwt-simple')
const pinterest = require('passport-pinterest')

module.exports = router

router.get('/', passport.authenticate('pinterest', { scope: 'email' }));

router.get('/callback',
passport.authenticate('pinterest', { failureRedirect : '/login' }), (req, res) => res.redirect('/'));

const pinterestCredentials = {
  clientID: '5001086713473297614',
  clientSecret: 'b6be9664e307f5002bedc6b112de2e00c9e7dfbf0b773eba961a5db7b5141774',
  scope: ['read_public', 'write_public'],
  callbackURL: '/api/pinterest/callback'
};

const verificationCallback = (accessToken, refreshToken, profile, done) => {
  console.log('callback profile: ', profile)
  const info = {
    name : profile.displayName,
    password : 'oAuth'
  };
  User.findOrCreate({
    where : { pinterestId : profile.id },
    defaults : info
  })
  .then(user => {
    console.log('callback USER : ', user)
    done(null, user[0].dataValues)
  })
};

const strategy = new pinterest.Strategy(pinterestCredentials, verificationCallback);

passport.use(strategy);

