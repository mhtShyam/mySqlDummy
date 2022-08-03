const sendRsp = require('../helpers/response').sendRsp; 
const userModel = require('../models/User')


const userControler = {
    create:async(req, res)=>{
        try {
            let result = await userModel.userCreateResponse({
                name:'mmsk',
                mail:'mmsk@gmail.com',
                passwd:'3jjjj'});
            if(result){
                
                return sendRsp(res, 200, 'Success', result);
            }
        } catch (error) {
            return sendRsp(res, 500, 'Internal Server Error', error.message)
        }
    }
}

module.exports ={userControler};