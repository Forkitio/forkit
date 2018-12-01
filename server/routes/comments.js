const router = require('express').Router();
const {RecipeComment} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
    RecipeComment.findAll()
        .then(comment => res.send(comment))
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    RecipeComment.findById(req.params.id)
        .then(comment => res.send(comment))
        .catch(next)
});

router.post('/', (req, res, next) => {
    RecipeComment.create(req.body)
        .then(comment => res.status(201).send(comment))
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    RecipeComment.findById(req.params.id)
        .then(comment => comment.destroy)
        .then(() => res.sendStatus(204))
        .cathc(next)
});

router.put('/:id', (req, res, next) => {
    RecipeComment.findById(req.params.id)
        .then(comment => comment.update(req.body))
        .then(res => res.send(comment))
        .cathc(next)
});

/* NESTED ROUTES FOR COMMENTS */

router.get('/recipe/:recipeId', (req, res, next) => {
    RecipeComment.findAll({
        where: {
          recipeId: req.params.id
        }
    })
    .then(comments => res.send(comments))
    .catch(next);
});

router.get('/user/:recipeId', (req, res, next) => {
    RecipeComment.findAll({
        where: {
          userId: req.params.id
        }
    })
    .then(comments => res.send(comments))
    .catch(next);
});