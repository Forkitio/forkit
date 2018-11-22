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
        .cathc(next)
});

router.put('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(res => res.send(user))
        .cathc(next)
});

/* NEXTED ROUTES FOR RECIPES FORKED AND SAVED */

// gets user's forked recipies
// when recipe is forked or created by user - createdBy will populate
router.get('/:id/recipes/forked', (req, res, next) => {
    Recipe.findAll({
        where: {
            createdBy: req.params.id
        }
    })
    .then(recipes => res.send(recipes))
    .catch(next)
})

// gets user's saved recipes
router.get('/:id/recipes/saved', (req, res, next) => {
    Recipe.findAll({
        where: {
            userId: req.params.id
        }
    })
    .then(recipes => res.send(recipes))
    .catch(next)
})

// creates an original recipe
router.post('/:id/recipes', (req, res, next) => {
    let body = req.body;
    body.createdBy = req.parms.id;
    body.parentId = null;
    body.ancestoryId = null;
    Recipe.post(body)
    .then(recipe => res.status(201).send(recipe))
    .catch(next)
})


// creates the fork for given user with parent recipe id - recipeId
router.post('/:id/recipes/forked/:recipeId', (req, res, next) => {
    // need parent to determine whether or not this is the original recipie or a fork
    const parent = null;
    Recipe.findById(req.params.recipeId)
        .then(res => {
            parent = res.data;
        });
    let body = req.body;
    body.createdBy = req.parms.id;
    body.parentId = req.params.recipeId;
    // if the parent's ancestoryId is null then this is an original recipe and the forked revipe
    // should set ancestoryId to the id of parent recipe
    // otherwise parent recipe is a fork intself and the ancestoryId should persist
    parent.ancestoryId === null ?  body.ancestoryId = req.params.recipeId : body.ancestoryId = parent.ancestoryId
    Recipe.create(body)
        .then(recipe => res.send(recipe))
        .catch(next);
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





