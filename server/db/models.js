const conn = require('./conn.js')

const User = conn.define('users', {
    id: {
      type: conn.Sequelize.UUID,
      defaultValue: conn.Sequelize.UUIDV4,
      primaryKey: true
    },
    pinterestId:{
        type: conn.Sequelize.STRING
    },
    instagramId:{
        type: conn.Sequelize.STRING
    },
    firstName: {
      type: conn.Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    lastName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
    email: {
        type: conn.Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
      type: conn.Sequelize.STRING(80),
    },
    password: {
      type: conn.Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
    },
    img: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        defaultValue: "http://via.placeholder.com/640x360"
    },
    protein: {
        type: conn.Sequelize.ARRAY(conn.Sequelize.ENUM('beef', 'chicken', 'fish', 'vegetarian', 'lamb', 'tofu')),
        allowNull: true
    },
    cuisine: {
        type: conn.Sequelize.ARRAY(conn.Sequelize.ENUM('chinese', 'japanese', 'italian', 'indian', 'mediterranean', 'thai')),
        allowNull: true
    },
    skill: {
        type: conn.Sequelize.ENUM('expert', 'advanced', 'intermediate', 'beginner'),
        allowNull: true
    },
    diet: {
        type: conn.Sequelize.ENUM('vegetarian', 'vegan', 'paleo', 'low-carb', 'no diet'),
        allowNull: true
    },
    time: {
        type: conn.Sequelize.ENUM('15 min', '30 min', '1 hr', '> 1 hr'),
        allowNull: true
    }
})


const Recipe = conn.define('recipes', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    title:{
        type: conn.Sequelize.STRING(100),
    },
    directions:{
        // type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
        type: conn.Sequelize.TEXT
    },
    ingredients:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
    },
    time:{
        type: conn.Sequelize.INTEGER,
        defaultValue: 1,
        // allowNull: false
    },
    serving:{
        type: conn.Sequelize.INTEGER,
        // allowNull: false,
        defaultValue: 1
    },
    nutrition:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.JSON)
    },
    healthLabels: {
        type: conn.Sequelize.ARRAY(conn.Sequelize.JSON)
    },
    dietLabels:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.JSON)
    },
    ancestoryId: {
        type: conn.Sequelize.UUID,
        defaultValue: null
    },
    img: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        defaultValue: "http://via.placeholder.com/640x360"
    },
    //parent recipe
    parentId:{
        type: conn.Sequelize.UUID,
        defaultValue: null
    },
    //used id
    createdBy:{
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    }
})

const RecipeComment = conn.define('comments', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    title:{
        type: conn.Sequelize.STRING(100),
        allowNull: false
    },
    content: {
        type: conn.Sequelize.TEXT,
        allowNull: false
    }
})

//Associations

//Following
User.belongsToMany(User, { through: 'followers' , as: 'following' })
User.belongsToMany(User, { through: 'followers' , as: 'follower' })

//Comments
User.hasMany(RecipeComment)
RecipeComment.belongsTo(User)
Recipe.hasMany(RecipeComment)
RecipeComment.belongsTo(Recipe)

//Recipe Use
Recipe.belongsTo(User)
User.hasMany(Recipe)

// //Saved Recipe
// Recipe.hasMany(Recipe)

module.exports = {
  conn,
  User,
  Recipe,
  RecipeComment,
}
