const router = require('express').Router();
const {Recipe, RecipeComment} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Recipe.findAll()
    .then(recipies => res.send(recipies))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.send(recipe))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Recipe.create(req.body)
    .then(recipe => res.status(201).send(recipe))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => recipe.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => recipe.update(req.body))
    .then(recipe => res.send(recipe))
    .catch(next);
});

/* NEXTED ROUTES FOR COMMENTS */

router.get('/:id/comments', (req, res, next) => {
  RecipeComment.findAll({
      where: {
        userId: req.params.id
      }
  })
  .then(comments => res.send(comments))
  .catch(next);
})


