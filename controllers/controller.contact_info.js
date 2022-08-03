const sendRsp = require('../helpers/response').sendRsp; 
const Contact_infoModel = require('../models/Contact_info');
const csvToDb= require('../utils/csvToDb');

const contactController={
    create: async(req, res)=>{
        try{
            const result = await Contact_infoModel.contactCreateResponse({
                address:'thane',
                phone_no:'452548745874',
                userId:1
            });
            if(result){
                return sendRsp(res, 200, 'Success', result);
            }
        }catch(error){
            return sendRsp(res, 500, 'Internal Server Error', error.message)
        }
    }
}

module.exports={contactController}