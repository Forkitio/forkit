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
        type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
    },
    ingredients:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
    },
    time:{
        type: conn.Sequelize.INTEGER,
        allowNull: false
    },
    serving:{
        type: conn.Sequelize.INTEGER,
        allowNull: false
    },
    nutrition:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.JSON)
    },
    healthLabels: {
        type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
    },
    dietLabels:{
        type: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
    },
    ancestoryId: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    img: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        defaultValue: "http://via.placeholder.com/640x360"
    },
    //parent recipe
    parentId:{
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
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

//Saved Recipe
User.hasMany(Recipe)


module.exports = {
  conn,
  User,
  Recipe, 
  RecipeComment,
}