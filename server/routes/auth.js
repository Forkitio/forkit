const router = require('express').Router()
const { User } = require('../db/models.js')
const jwt = require('jwt-simple')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('auth route : ', req.body)
  const { username, password } = req.body;
  User.findOne({
    where : { username, password}
  })
    .then( user => {
      console.log('auth route user: ', user.id)
      const token = jwt.encode({ id : user.id }, process.env.JWT_SECRET);
      console.log('auth route token: ', token)
      res.send({ token });
    })
});

router.get('/', (req, res, next) => {
  console.log('get Auth: ', req.user)
  if(!req.user) {
    console.log('get Auth in if statement')
    return next({ status : 401 });
  }
  res.send(req.user);
})


