const sendRsp = require('../helpers/response').sendRsp; 
const postModel = require('../models/Post')

const postController={
    create: async(req, res)=>{
        try{
            const result = await postModel.postCreateResponse({
                title:'new post',
                body:"new post content",
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

module.exports={postController}