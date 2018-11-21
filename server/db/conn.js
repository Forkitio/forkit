<<<<<<< HEAD
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgress://localhost/forkit', { logging : false })

module.exports = conn
=======
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/forkit')

module.exports = conn;
>>>>>>> c7faa0ae280bacb7854881bf42b6987a37e9d791
