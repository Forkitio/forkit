const router = require('express').Router()
const User = require('../db/User')
const jwt = require('jwt-simple')
module.exports = router

router.post('/', (req, res, next) => {
  const { name, password } = req.body;
  User.findOne({
    where : { name, password}
  })
    .then( user => {
      const token = jwt.encode({ id : user.id }, process.env.JWT_SECRET);
      res.send({ token });
    })
});

router.get('/', (req, res, next) => {
  if(!req.user) {
    return next({ status : 401 });
  }
  res.send(req.user);
})

