const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

const Post = sequelize.define('Post',{
    title:{
        type:Sequelize.STRING(25),
    },
    body:{
        type:Sequelize.STRING(300)
    },
    userId:{
        type:Sequelize.INTEGER(11),
        allowNull: false
    }
},{
    freezTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
})

module.exports={
    postCreateResponse: async(req)=>{
        try{
            const res = Post.create(req);
            if(res){
                return res;
            }else{
                return new Error('Data Proccess Failed.')
            }
        }catch(error){
            throw error;
        }
    },
}