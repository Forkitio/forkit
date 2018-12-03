const router = require('express').Router()
const passport = require('passport')
const { User } = require('../db/models.js')
const jwt = require('jwt-simple')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = router

router.get('/', passport.authenticate('google', { scope : 'email' }));

router.get('/callback',
passport.authenticate('google', { session : false, failureRedirect : '/login' }), (req, res) => {
  const token = req.user.token;
  res.redirect('/?token=' + token)
});


const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/google/callback',
  state : false
};

const verificationCallback = (accessToken, refreshToken, profile, done) => {
  console.log('callback profile: ', profile)
  const info = {
    firstName : profile.name.givenName,
    lastName : profile.name.familyName,
    img : profile.photos[0].value,
    email : profile.emails[0].value,
    password : accessToken
  };
  User.findOrCreate({
    where : { googleId : profile.id },
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

const strategy = new GoogleStrategy(googleCredentials, verificationCallback);

passport.use(strategy);


passport.serializeUser(function(user, done) {
  done(null, user);
 });
 passport.deserializeUser(function(user, done) {
  done(null, user);
 });
