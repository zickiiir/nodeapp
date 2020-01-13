const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeapp', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;