const conn = require('./conn');
const { User, Comment, Recipe } = require('./models.js');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ 
          firstName: 'moe',
          lastName: 'smith',
          email: 'moe@gmail.com',
          username: 'moe',
          password: 'moe',
          pinterestId: null,
          instagramId: null,
          img: "http://via.placeholder.com/640x360"
        }),
        User.create({
          firstName: 'larry',
          lastName: 'smith',
          email: 'larry@gmail.com',
          username: 'larry',
          password: 'larry',
          pinterestId: null,
          instagramId: null,
          img: "http://via.placeholder.com/640x360"
        }),
        User.create({
          firstName: 'curly',
          lastName: 'smith',
          email: 'curly@gmail.com',
          username: 'curly',
          password: 'curly',
          pinterestId: null,
          instagramId: null,
          img: "http://via.placeholder.com/640x360"
        }),
      ]);
    })
    .then((users) => {
      [ moe, larry, curly ] = users
      return Promise.all([
        Recipe.create({
          title: 'Tabbouleh',
          time: 3,
          serving: 4,
        })
      ])
    })
    .then((recipes) => {
      [ tabbouleh, hummus, babaghanoush ] = recipes
      return Promise.all([
        Comment.create({title: 'A', content: 'AA'}),
        Comment.create({title: 'B', content: 'BB'}),
        Comment.create({title: 'C', content: 'CC'}),
      ])
    })
};

module.exports = {
  syncAndSeed
};
