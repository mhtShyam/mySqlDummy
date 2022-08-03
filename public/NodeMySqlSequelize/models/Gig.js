const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports= Gig = db.define('Gig',{
    title:{
        type:Sequelize.STRING(20)
    },
    technologies:{
        type:Sequelize.STRING(20)
    },
    description:{
        type:Sequelize.STRING(20)
    },
    budget:{
        type:Sequelize.STRING(20)
    },
    contact_mail:{
        type:Sequelize.STRING(20)
    },
})
