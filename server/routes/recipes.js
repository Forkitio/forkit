const router = require('express').Router();
const {Recipe, RecipeComment} = require('../db/models');
const conn = require('./../db/conn');
const Op = conn.Sequelize.Op;

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

/* NESTED ROUTES FOR RECIPES */

// get all forked recipes
router.get('/:id/forked', (req, res, next) => {
  Recipe.findAll({
    where: {
      createdBy: req.params.id,
      parentId: {
        [Op.ne]: null
      }
    }
  }).then(recipes => res.send(recipes))
    .catch(next);
});

// get all version of a forked recipe
router.get('/:id/forked/:recipeId', (req, res, next) => {
  Recipe.findAll({
    where: {
      createdBy: req.params.id,
      ancestoryId: recipeId
    }
  }).then(recipes => res.send(recipes))
    .catch(next);
});

// get all saved recipes
router.get('/:id/saved', (req, res, next) => {
  Recipe.findAll({
    where: {
      userId: req.params.id
    },
    include: [ { model: User } ]
  }).then(recipes => res.send(recipes))
    .catch(next);
});

// get all created recipes
router.get('/:id/created', (req, res, next) => {
  Recipe.findAll({
    where: {
      createdBy: req.params.id,
      parentId: null,
      ancestoryId: null
    }
  }).then(recipes => res.send(recipes))
    .catch(next);
});




