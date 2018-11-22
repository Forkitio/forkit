const router = require('express').Router()
const passport = require('passport')
const User = require('../db/models.js')
const jwt = require('jwt-simple')
const pinterest = require('passport-pinterest')
module.exports = router

router.get('/', passport.authenticate('pinterest', { scope : 'email' }));

router.get('/callback',
passport.authenticate('pinterest', { session : false, failureRedirect : '/login' }), (req, res) => {
  var token = req.user.token;
  res.redirect('/?token=' + token)
});


const pinterestCredentials = {
  clientID: '5001086713473297614',
  clientSecret: 'b6be9664e307f5002bedc6b112de2e00c9e7dfbf0b773eba961a5db7b5141774',
  scope: ['read_public', 'write_public'],
  callbackURL: '/api/pinterest/callback',
  state : false
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
    console.log('accessToken: ', accessToken)
    console.log('callback USER : ', user)
    const userObj = user[0].dataValues;
    const token = jwt.encode({ id : userObj.id }, process.env.JWT_SECRET );
    const userData = { token : token };
    done(null, userData);
  })
};

const strategy = new pinterest.Strategy(pinterestCredentials, verificationCallback);

passport.use(strategy);


passport.serializeUser(function(user, done) {
  done(null, user);
 });
 passport.deserializeUser(function(user, done) {
  done(null, user);
 });
