const Sequelize = require('sequelize');
const Post = require('./Post');
const Contact_info = require('./Contact_info');
const sequelize = require('../database/connection')

const User = sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(25),
        allowNull:false,
    },
    mail:{
        type:Sequelize.STRING(25),
        allowNull:false
    },
    passwd:{
        type:Sequelize.STRING(12),
        allowNull:false
    },
},{
    freezTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
})


// User.hasMany(Post);
// Post.belongsTo(User);

// User.hasOne(Contact_info);
// Contact_info.belongsTo(User)

module.exports ={
    userCreateResponse: async(req)=>{
        try{
            const res = User.create(req);
            if(res){
                return res;
            }else{
                return new Error('Data process failed.')
            }
        }catch(error){
            throw error;
        }
    },
    getAllUserDetails: async(req)=>{
        try{
            const res = User.findAll({where:{id: req.params.id}});
            if(res){
                return res;
            }else{
                return new Error('data process failed')
            }
        }catch(error){
            throw error;
        }
    }
}

