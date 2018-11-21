const conn = require('./conn');
const { User, Comment, Recipe } = require('./models.js');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ firstName: 'moe', lastName: 'smith', password: 'MOE' }),
        User.create({ firstName: 'larry', lastName: 'elton', password: 'LARRY' }),
        User.create({ firstName: 'curly', lastName: 'jones', password: 'CURLY' }),
      ]);
    })
    .then((users) => {
      [ moe, larry, curly ] = users
      return Promise.all([
        Recipe.create({
          title: 'Tabbouleh',
          time: 3,
          serving: 4,
        }),
        Recipe.create({}),
        Recipe.create({}),
      ])
    })
    .then((recipes) => {
      [ tabbouleh, hummus, babaghanoush ] = recipes
      return Promise.all([
        Comment.create({}),
        Comment.create({}),
        Comment.create({}),
      ])
    })
    .then((comments) => {
      [ good, ok, bad ] = comment
      return Promise.all([
        plantLI.setOrder(guestCart)
      ])
    })
};

module.exports = {
  syncAndSeed
};
