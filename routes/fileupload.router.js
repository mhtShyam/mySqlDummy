const router = require('express').Router();
const fileuploadControler = require('../controllers/controller.fileupload');
const multer = require('multer');
const path = require('path')


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname+'-'+(Math.random(10)+1)+'-'+ Date.now() +path.extname(file.originalname),
      )
    },
  })

var upload = multer({
    storage: storage,
  },{limits : {fieldNameSize : 10}}).array('uploadfile',2)

router.post('/',upload, fileuploadControler.fileupload)

module.exports = router