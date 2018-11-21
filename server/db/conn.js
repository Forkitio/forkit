const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgress://localhost/forkit', { logging : false })

module.exports = conn