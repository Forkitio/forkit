const router = require('express').Router();
const {User, Recipe} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next)
});

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy)
        .then(() => res.sendStatus(204))
        .catch(next)
});

router.put('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next)
});

/* NESTED ROUTES FOR FOLLOWERS */

// gets all followed users for given user
router.get('/:id/following', (req, res, next) => {
    User.findAll({
        where: {
            id,
            include: [ { model: User, as: 'following' } ]
        }
    })
    .then(user => res.send(user))
    .catch(next)
});

// gets all followers for given user
router.get('/:id/followers', (req, res, next) => {
    User.findAll({
        where: {
            id,
            include: [ { model: User, as: 'follower' } ]
        }
    })
    .then(user => res.send(user))
    .catch(next)
});





