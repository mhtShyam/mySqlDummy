const Sequelize = require('sequelize');

module.exports = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING(25),
        allowNull:false,
        unique:true
    },
    passwd:{
        type:Sequelize.STRING(11),
        allowNull:false
    },
})