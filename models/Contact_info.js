const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

const Contact_info= sequelize.define('Contact_info',{
    address:Sequelize.STRING(100),
    phone_no:Sequelize.STRING(13),
    userId:{
        type: Sequelize.INTEGER(11)
    }
},{
    freezTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
})

module.exports ={
    contactCreateResponse: async(req)=>{
        try{
            const res = Contact_info.create(req);
            if(res){
                return res;
            }else {
                return new Error('data Process Failed')
            }
        }catch(error){
            throw error
        }
    }
}