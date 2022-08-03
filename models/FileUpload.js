const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const FileUpload = sequelize.define('FileUpload',{
    name:{
        type:Sequelize.STRING(25),
    },
    mail:{
        type:Sequelize.STRING(300)
    },
    phone_no:{
        type:Sequelize.INTEGER(11),
        allowNull: false
    }
},{
    freezTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
})

module.exports = FileUpload;