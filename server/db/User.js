const conn = require('./conn');
const User = conn.define('user', {
  name : {
    type : conn.Sequelize.STRING,
    allowNull : false,
    unique : true,
    validate : {
      notEmpty : true
    }
  },
  password : {
    type : conn.Sequelize.STRING,
    allowNull : false,
    unique : true,
    validate : {
      notEmpty : true
    }
  },
  pinterestId : {
    type : conn.Sequelize.STRING
  },
  instagramId : {
    type : conn.Sequelize.STRING
  }
});

module.exports = User;
