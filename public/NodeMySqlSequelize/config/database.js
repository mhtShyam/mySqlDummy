const Sequelize = require('sequelize');


module.exports= db = new Sequelize('mydb', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql'
  });
