const Sequelize = require('sequelize');
const {development} = require('../../config/config.json')

const sequelize = new Sequelize('socialnetwork', development.username, development.password,{
    host:development.host,
    dialect:development.dialect,
    })

module.exports = sequelize;
global.sequelize = sequelize;