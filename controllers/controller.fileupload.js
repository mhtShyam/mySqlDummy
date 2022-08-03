const sendRsp = require('../helpers/response').sendRsp; 

const fileuploadControler = {
    fileupload: async(req, res)=>{
        console.log('fileupload=>', req.file)
        try{
            Object.keys(req.files).map(keys=>{
                csvToDb(__dirname + '/uploads/' + req.files[keys].filename)
            })
            const result = {
                msg: 'File successfully inserted!',
                file: req.files,
            }
            return sendRsp(res, 200, 'Success', result);
        }catch(error){
            return sendRsp(res, 500, 'Internal Server Error', error.message)
        }
   }
}

module.exports = fileuploadControler;