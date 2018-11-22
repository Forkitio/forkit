const router = require('express').Router()
const User = require('../db/models.js')
const jwt = require('jwt-simple')
module.exports = router

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where : { username, password}
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


