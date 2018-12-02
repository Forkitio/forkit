const conn = require('./conn');
const Sequelize = require('sequelize');

const { User, RecipeComment, Recipe } = require('./models.js');

const syncAndSeed = () => {
  let Gordon, Anthony, Rachael, tabbouleh, hummus, babaghanoush

  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ 
          firstName: 'Gordon',
          lastName: 'Ramsay',
          email: 'gordon@gmail.com',
          username: 'gordon',
          password: 'gordon',
          protein: ['beef', 'chicken', 'fish'],
          cuisine: ['chinese', 'indian','thai'],
          skill: 'advanced',
          diet: 'low-carb',
          pinterestId: null,
          instagramId: null,
          img: "https://cdn2.i-scmp.com/sites/default/files/styles/landscape/public/images/methode/2018/10/06/698694fa-c6d4-11e8-9907-be608544c5a1_1280x720_113644.jpg?itok=4wUEjYn8"
        }),
        User.create({
          firstName: 'Anthony',
          lastName: 'Bourdain',
          email: 'anthony.bourdain@gmail.com',
          username: 'anthony',
          password: 'anthony',
          protein: ['beef', 'chicken', 'fish'],
          cuisine: ['chinese', 'indian','thai'],
          skill: 'advanced',
          diet: 'low-carb',
          time: '30 min',
          pinterestId: null,
          instagramId: null,
          img: "https://pixel.nymag.com/imgs/fashion/daily/2018/06/08/08-anthony-bourdain-2.w700.h467.2x.jpg"
        }),
        User.create({
          firstName: 'Rachael',
          lastName: 'Ray',
          email: 'rachael@gmail.com',
          username: 'rachael',
          password: 'rachael',
          protein: ['beef', 'chicken', 'fish'],
          cuisine: ['chinese', 'indian','thai'],
          skill: 'advanced',
          diet: 'low-carb',
          pinterestId: null,
          instagramId: null,
          img: "https://www.rachaelraymag.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1400/MTUwMTcxNjQ2MDE0MDA3MjMx/rachael-ray-headshot-1017-103052773.webp"
        }),
        ]);
      })
      .then( users => {
        [ Gordon, Anthony, Rachael ] = users

        return Promise.all([
          Recipe.create({
            title: 'tabbouleh',
            time: 3,
            serving: 4,
            createdBy: Anthony.id
          }),
          Recipe.create({
            title: 'hummus',
            time: 3,
            serving: 4,
            createdBy: Anthony.id
          }),
          Recipe.create({
            title: 'babaghanoush',
            time: 3,
            serving: 4,
            createdBy: Anthony.id
          }),
        ])
      })
    .then((recipes) => {
      [ tabbouleh, hummus, babaghanoush ] = recipes

      tabbouleh.setUser(Anthony)

      return Promise.all([
        RecipeComment.create({title: 'A', content: 'AA'}),
        RecipeComment.create({title: 'B', content: 'BB'}),
        RecipeComment.create({title: 'C', content: 'CC'}),
      ])
    })
};

module.exports = {
  syncAndSeed
};
