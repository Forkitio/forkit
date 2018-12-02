const conn = require('./conn');
const Sequelize = require('sequelize');

const { User, RecipeComment, Recipe } = require('./models.js');

const syncAndSeed = () => {
  let Gordon, Anthony, Rachael, Tabbouleh, Hummus, Babaghanoush

  return conn.sync({ force: true })
    .then(() => {
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
          cuisine: ['chinese', 'indian', 'thai'],
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
    .then((users) => {
      [Gordon, Anthony, Rachael] = users
      return Promise.all([
        Recipe.create({
          title: 'Tabbouleh',
          directions: '1. Rinse the bulgur in several changes of cold water. Drain well and put in a bowl. Stir it with a fork every now and then to help it fluff up 2. Put the diced tomatoes in a bowl and set aside while you prepare the herbs. A word of warning: do not chop the herbs with a mezzaluna. This will only bruise them. Using a razor-sharp knife, grab as much of the parsley and mint as you can handle in a bunch, and slice them very thin, to end up with nice, crisp slender strips 3. Drain the tomatoes of their juice and put in a large bowl. Add the spring onion and herbs. Sprinkle the bulgur all over. Season with the cinnamon, allspice and pepper. Add salt to taste. Add the lemon juice and olive oil and mix well. Taste and adjust the seasonings if necessary. Serve immediately with the quartered gem lettuce.',
          ingredients: ['3 tbsp (30g) fine bulgur', '3 medium (600g) firm ripe tomatoes, diced into small cubes', '2 (50 g) spring onions or scallions, trimmed and very thinly sliced', '14 oz (400g) flat-leaved parsley, most of the stalks discarded, leaves washed and dried', '2 cup (20g) mint leaves (no stems), washed and dried', '1/4 tsp ground cinnamon', '1/2 tsp ground allspice (or Lebanese seven-spice mixture)'],
          time: 30,
          serving: 8,
          healthLabels: ['Peanut-Free',
            'Tree-Nut-Free',
            'Alcohol-Free'],
          dietLabels: ['Low-Carb'],
          createdBy: Anthony.id,
          img: 'https://img.taste.com.au/chMTakge/w643-h428-cfill-q90/taste/2016/11/tabouli-77701-1.jpeg',
        }),
    Recipe.create({
      title: 'Babaganoush',
      directions: 'Preheat oven to 450 degrees F.Prick eggplant with a fork and place on a cookie sheet lined with foil. Bake the eggplant until it is soft inside, about 20 minutes. Alternatively, grill the eggplant over a gas grill, rotating it around until the skin is completely charred, about 10 minutes. Let the eggplant cool. Cut the eggplant in half lengthwise, drain off the liquid, and scoop the pulp into a food processor. Process the eggplant until smooth and transfer to a medium bowl.On a cutting board, work garlic and 1/4 teaspoon salt together with the flat side of a knife, until it forms a paste. Add the garlic-salt mixture to the eggplant. Stir in the parsley, tahini, and lemon juice. Season with more salt, to taste. Garnish with additional parsley.',
      ingredients: ['1 large eggplant (about 1 pound)', '1 glove garlic, minced', '1/4 teaspoon salt', '1/4 cup finely chopped fresh flat-leaf parsley, plus more for garnish', '2 tablespoons tahini', '2 tablespoons lemon juice'],
      time: 1,
      serving: 2,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-Carb'],
      createdBy: Anthony.id,
      img: 'https://www.seriouseats.com/images/2014/02/20140225-baba-ganoush-recipe-food-lab-vegan-primary-2.jpg',
    }),
    Recipe.create({
      title: 'Baked Chicken Shawarma',
      directions: 'In a large bowl combine coriander, allspice, cinnamon, cumin, ginger, turmeric cayenne, pepper, salt, lemon juice, olive oil, and garlic. Add chicken and toss to coat. Place in a large zip-top bag and refrigerate for at least 1 hour and as long as overnight. Preheat oven to 425· F. Line a large baking tray with aluminum foil. Place chicken in one layer on prepared tray. Bake until golden brown, crispy around the edges, and no longer pink in the middle, about 20 to 25 minutes. Let chicken rest for 10 minutes. Slice chicken into thin pieces. For extra crispy chicken, heat the last tablespoon of olive oil in a large frying pan. Crisp chicken in pan, stirring often, until golden brown and crispy, about 4 to 5 minutes. Serve chicken shawarma in pita topped with sliced red onion, chopped parsley, shredded cabbage, pickled turnips, and tahini.',
      ingredients: ['2 teaspoons coriander, 1 teaspoon allspice', '1 teaspoon cumin', '1 teaspoon ground ginger', '1 teaspoon turmeric', '1/2 teaspoon cinnamon', '1/2 teaspoon cayenne',
        '1/2 teaspoon pepper', '1 teaspoon salt', '3 tablespoons lemon juice', '2 tablespoons olive oil', 'plus 1 tablespoon for crisping on the stove', '2 garlic cloves minced', '2 pounds boneless', 'skinless chicken thighs', '6 pita', '1 red onion'],
      time: 1,
      serving: 6,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-​Carb', 'Low-Sugar', 'High-Fiber'],
      createdBy: Anthony.id,
      img: 'https://images.food52.com/07EJrOzOdqr296J_YZRu9ls5CgA=/753x502/04189bd1-6884-41e7-a94a-96600a1437a8--Shawarma_3_1-.jpg',
    }),
    Recipe.create({
      title: 'Chicken Tikka Masala',
      directions: 'In a food processor, pulse the chile and ginger until very finely chopped. Add the canned tomatoes with their juice and process until the mixture is puréed. Set aside Melt 6 Tbs. of the butter in a 6- to 8-quart Dutch oven over medium heat. When the foam subsides, add about a third of the chicken pieces and cook, stirring frequently, until the chicken absorbs some of the butter and begins to brown, 3 to 4 minutes. With a slotted spoon, transfer the chicken to a plate. Repeat with the remaining two batches of chicken. Add the remaining 2 Tbs. butter to the pan. When it’s melted, add the paprika and 4 tsp. of the cumin and stir until the spices just begin to darken, 10 to 15 seconds. Immediately add the tomato mixture. Simmer vigorously, uncovered, stirring frequently, until the sauce has thickened slightly, 6 to 8 minutes. Add the cream and 1 tsp. kosher salt and stir well. Add the chicken and stir gently to mix. Reduce the heat to medium low and simmer, uncovered, stirring occassionally, for 10 minutes. Stir in the garam masala and remaining cumin. Remove from the heat, cover, and allow to rest for 15 minutes. Taste and add more salt if necessary. Transfer to a serving bowl, garnish with cilantro, and serve.',
      ingredients: ['1 recipe Roasted Tandoori Chicken, meat removed from bones in large pieces; try not to shred (about 5 cups)', '8 Tbs. unsalted butter' ,  '3/4 cup coarsely chopped fresh cilantro',
      '2 tsp. garam masala (store-bought or homemade)', '1 2-inch-long hot green chile (preferably serrano) stemmed but not seeded, chopped', '1 1-inch piece fresh ginger, peeled and chopped', '2 tsp. sweet paprika', '2 Tbs. cumin seeds, toasted and ground in a spice grinder', '1 28-oz. can whole tomatoes'],
      time: 1.5,
      serving: 6,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-Carb', 'Low-Sugar', 'High-Fiber'],
      createdBy: Gordon.id,
      img: 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18192953/fc81va068-01-main.jpg',
    }),
    Recipe.create({
      title: 'Chinese Egg and Scallion Dumplings',
      directions: 'Pour the flour into a mound on a clean work surface. Make a deep, wide well in the center and pour in 1/2 cup cold water. Stir with your fingers, staying in the center at first and being careful that the water doesn’t breach the wall. Little by little, using your hand and a bench knife, mix in flour from the sides until the dough starts to come together. (Alternatively, put the flour in a medium bowl. Make a well, add the water, and stir first with a spoon and then your hand.) If the dough remains in shreds, sprinkle in additional water, a teaspoon at a time, until it begins to stick together. Don’t add too much water or the dough will be difficult to work.Knead the dough for 5 minutes to form a smooth, firm, elastic ball. (If you began the dough in a bowl, lightly dust a clean, dry surface with flour before kneading.) The dough should not be sticky and should bounce back when pressed with a fingertip. Divide in half with a bench knife and roll into two 6-inch logs. Sprinkle each log evenly with flour, cover with a clean kitchen towel, and let rest for at least 30 minutes at room temperature before rolling and filling.',
      ingredients: ['2 medium cloves garlic, minced',
      'Kosher salt, as needed (for boiled dumplings)',
      '4 large eggs',
      'Kosher salt and freshly ground black pepper',
      '1 recipe Ginger Vinegar or Scallion-Soy Dipping Sauce',
      'Vegetable oil, as needed (for pan-fried dumplings)',
      '2 Tbs. vegetable oil',
      '1 cup thinly sliced scallions',
      '6-3/4 oz. (1-1/2 cups) unbleached all-purpose flour; more for kneading',
      '1/2 tsp. toasted Asian sesame oil'],
      time: 1.5,
      serving: 6,
      healthLabels: ['Balanced', 'Dairy-Free'],
      dietLabels: ['Low-Carb', 'Low-Sugar', 'Vegetarian'],
      createdBy: Gordon.id,
      img: 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18132452/051103075-03-egg-scallion-dumplings-recipe-main.jpg',
    }),
    Recipe.create({
      title: 'Pineapple Fried Rice',
      directions: "Start by making the dressing. Combine the oil, sesame oil, pineapple juice, garlic, red pepper flakes, soy sauce, fresh pineapple, ginger, and salt in a blender or food processor. Puree until smooth. Transfer to a small saucepan, and gently warm just before serving, don't simmer or boil. In an extra-large bowl toss the mizuna with a generous splash of the dressing. Arrange it on a platter (as a bed for the rice). You can serve the rice portion of this recipe room temperature or hot - Wayne really loved the hot version, and so did I. In the same bowl you used to toss the greens, or in an extra large skillet over medium heat, combine the rice, most of the onions, shallots, cashews and serrano chile, and seitan. Add about half of the dressing and toss well. If you are serving the rice hot, saute it in the pan until it is heated throughout. Taste, and adjust with more dressing if needed. Spoon the rice over the greens and finish with any remaining onions, shallots, cashews, and seitan.",
      ingredients: ['1/3 cup macadamia oil, olive oil, or sunflower oil',
      '2 teaspoons toasted sesame oil',
      '1/4 cup (fresh or canned) all-natural 100% pineapple juice',
      '1 garlic clove',
      '1/4 teaspoon red pepper flakes',
      '2 tablespoons soy sauce (or shoyu)',
      '1 cup pineapple, cut into chunks',
      '2 teaspoons freshly grated ginger',
      '1/4 teaspoon fine grain sea salt',
      '4 handfuls of mizuna, watercress, or arugula',
      '2 1/2 cups cooked brown rice, room temperature',
      '4 green onions, thinly sliced',
      '3 shallots, peeled and thinly sliced',
      '1 cup cashews, roasted/toasted and chopped',
      '1/2 small serrano chile, seeded and deveined, and minced (optional)',
      '4 ounces seitan, cut into little bits and pan-fried (optional)'],
      time: 1,
      serving: 4,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-Carb', 'Low-Sugar', 'High-Fiber'],
      createdBy: Rachael.id,
      img: 'https://images.101cookbooks.com/pineapple_rice_recipe.jpg?w=680&auto=format',
    }),
    Recipe.create({
      title: 'Cuban Black Bean Patties',
      directions: 'To prepare rice, cook rice according to package directions, omitting salt and fat. Drain; place rice in a large bowl. Melt butter in a nonstick skillet over medium-high heat. Add pineapple; sauté 4 minutes or just until pineapple begins to brown. Add pineapple mixture, cilantro, and 1/4 teaspoon salt to rice in bowl; cover and keep warm. Wipe pan clean with paper towels.      ',
      ingredients: ['1 (3 1/2-ounce) bag boil-in-bag long-grain rice',
      '2 teaspoons butter',
      '1 cup diced fresh pineapple',
      '2 tablespoons chopped fresh cilantro',
      '1/4 teaspoon salt'],
      time: 1,
      serving: 2,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-Carb', 'Low-Sugar', 'High-Fiber'],
      createdBy: Rachael.id,
      img: 'http://www.straightupfood.com/blog/wp-content/uploads/2012/10/CubanBurger_8635W2.jpg',
    }),
    Recipe.create({
      title: 'Pacific Pork Kebabs',
      directions: 'Preheat oven to 450 degrees F.Prick eggplant with a fork and place on a cookie sheet lined with foil. Bake the eggplant until it is soft inside, about 20 minutes. Alternatively, grill the eggplant over a gas grill, rotating it around until the skin is completely charred, about 10 minutes. Let the eggplant cool. Cut the eggplant in half lengthwise, drain off the liquid, and scoop the pulp into a food processor. Process the eggplant until smooth and transfer to a medium bowl.On a cutting board, work garlic and 1/4 teaspoon salt together with the flat side of a knife, until it forms a paste. Add the garlic-salt mixture to the eggplant. Stir in the parsley, tahini, and lemon juice. Season with more salt, to taste. Garnish with additional parsley.',
      ingredients: ['2 teaspoons coriander, 1 teaspoon allspice', '1 teaspoon cumin', '1 teaspoon ground ginger', '1 teaspoon turmeric', '1/2 teaspoon cinnamon', '1/2 teaspoon cayenne',
        '1/2 teaspoon pepper', '1 teaspoon salt', '3 tablespoons lemon juice', '2 tablespoons olive oil', 'plus 1 tablespoon for crisping on the stove', '2 garlic cloves minced', '2 pounds boneless', 'skinless chicken thighs', '6 pita', '1 red onion'],
      time: 1,
      serving: 6,
      healthLabels: ['Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'],
      dietLabels: ['Low-Carb', 'Low-Sugar', 'High-Fiber'],
      createdBy: Rachael.id,
      img: 'https://assets.marthastewart.com/styles/wmax-300/d21/med103031_0707_bag008/med103031_0707_bag008_vert.jpg?itok=oQOhJNwm',
      })
    ])
    .then((recipes) => {
      [ Tabbouleh, Hummus, Babaghanoush ] = recipes

      return Promise.all([
        RecipeComment.create({title: 'A', content: 'AA'}),
        RecipeComment.create({title: 'B', content: 'BB'}),
        RecipeComment.create({title: 'C', content: 'CC'}),
      ])
    })
  })
  }

module.exports = {
  syncAndSeed
};
